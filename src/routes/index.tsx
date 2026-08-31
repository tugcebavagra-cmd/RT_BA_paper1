import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const TITLE = "Real-Time Bundle Adjustment UAV Imagery";
const DESCRIPTION =
    "Real-time bundle adjustment for ultra-high-resolution UAV imagery using adaptive patch-based feature tracking.";
const OG_IMAGE = "/images/og-image.png";

export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: TITLE },
            { name: "description", content: DESCRIPTION },
            { property: "og:title", content: TITLE },
            { property: "og:description", content: DESCRIPTION },
            { property: "og:type", content: "website" },
            { property: "og:image", content: OG_IMAGE },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:image", content: OG_IMAGE },
        ],
    }),
    component: Index,
});

/* ---------------------------------
   AUTHORS
   Affiliations follow the paper: Iz is DLR + Twente (1, 2);
   Nex and Kerle are Twente only (2); Meissner and Berger are
   DLR only (1).
---------------------------------- */

const authors = [
    {
        name: "Selim Ahmet Iz",
        url: "https://www.linkedin.com/in/selim-ahmet-iz-854170163/",
        affil: "1, 2",
    },
    { name: "Francesco Nex", url: "#", affil: "2" },
    { name: "Norman Kerle", url: "#", affil: "2" },
    { name: "Henry Meissner", url: "#", affil: "1" },
    { name: "Ralf Berger", url: "#", affil: "1" },
];

/* ---------------------------------
   PROJECT LINKS
---------------------------------- */

const links = [
    {
        label: "📄 Paper",
        href: "https://isprs-annals.copernicus.org/articles/X-2-W2-2025/73/2025/",
    },
    {
        label: "💻 Code (Coming Soon)",
        href: "#",
        disabled: true,
    },
];

/* ---------------------------------
   TEASER VIDEO
   TODO: confirm the real filename/path — placeholder for now.
---------------------------------- */

const teaserVideo = {
    src: "/videos/Trailer_ISPRS_UAVG_SelimAhmetIz.mp4",
    caption: "Trailer — ISPRS UAV-g 2025",
};

/* ---------------------------------
   FIGURES
---------------------------------- */

const figure1 = {
    src: "/images/Figure_1.svg",
    caption:
        "Workflow overview: from raw UAV imagery and GNSS/IMU data to oriented, geo-referenced output.",
};

/* ---------------------------------
   METHOD STEPS
   The method is told as a sequence of seven steps (01–07), each
   paired with the figure that illustrates it. The teaser line is
   always visible; the fuller explanation is revealed when the
   figure (or the "Read more" toggle) is clicked, so the section
   stays scannable without losing the underlying detail.

   Step 07 uses a video instead of a static figure (isVideo: true).
---------------------------------- */

const methodSteps = [
    {
        index: "01",
        title: "Patch-based tracking",
        teaser: "Each image is divided into a user-defined grid of patches.",
        body: "Rather than processing the full image at once, individual patches are tracked across consecutive frames, reducing the search space while preserving the original image resolution.",
        figureLabel: "Figure 2",
        figureCaption:
            "User-defined patch grid overlaid on consecutive aerial frames.",
        src: "/images/Figure_2.svg",
        isVideo: false,
    },

    {
        index: "02",
        title: "Terrain-induced footprint distortion",
        teaser:
            "On uneven terrain, an image's ground footprint cannot be represented as a simple rectangle.",
        body: "Changes in elevation alter the viewing geometry, causing the projected footprint to become irregular.",
        figureLabel: "Figure 3",
        figureCaption:
            "Aerial camera positions and their image footprints projected onto an elevation model, illustrating how terrain relief alters the ground coverage of each image (adapted from Hein et al., 2019).",
        src: "/images/Figure_3.jpg",
        isVideo: false,
    },

    {
        index: "03",
        title: "From a flat assumption to the actual surface",
        teaser: "The effect can also be observed directly in the imagery.",
        body: "When an image is projected onto the actual terrain surface, its footprint no longer corresponds to the original rectangular image extent, revealing the geometric deformation caused by terrain relief.",
        figureLabel: "Figure 4",
        figureCaption:
            "A raw aerial image (left) and its corresponding surface-projected footprint (right), illustrating the resulting geometric deformation (adapted from Hein et al., 2019).",
        src: "/images/Figure_4.svg",
        isVideo: false,
    },

    {
        index: "04",
        title: "Terrain-guided propagation",
        teaser:
            "A single homography cannot fully capture terrain-induced deformation.",
        body: "Instead, patches are propagated between frames using GNSS/IMU pose information together with image-footprint projections onto a coarse digital surface model (DSM), such as TanDEM-X or SRTM. This footprint-guided strategy maintains spatial alignment across the full image extent, including image regions near the edges where pose-only propagation becomes less reliable.",
        figureLabel: "Figure 5",
        figureCaption:
            "Patch propagation using GNSS/IMU-based pose information (dashed) compared with the proposed footprint-guided approach (solid).",
        src: "/images/Figure_5.jpg",
        isVideo: false,
    },

    {
        index: "05",
        title: "Cross-strip consistency",
        teaser:
            "Patch tracking is extended beyond consecutive images within a single flight strip.",
        body: "When neighbouring strips overlap, previously defined patches are re-projected onto the new images, enabling feature tracking across strips and helping maintain consistent image orientation throughout the mission.",
        figureLabel: "Figure 6",
        figureCaption:
            "Patch correspondences within a flight strip (orange) and across adjacent strips (green).",
        src: "/images/Figure_6.svg",
        isVideo: false,
    },

    {
        index: "06",
        title: "Patch-constrained matching",
        teaser:
            "Feature matching is restricted to corresponding patch regions rather than performed across the full images.",
        body: "By narrowing the search space to spatially predicted regions, the method substantially reduces the computational cost of high-resolution matching.",
        figureLabel: "Figure 7",
        figureCaption:
            "Feature correspondences identified within spatially corresponding patch regions.",
        src: "/images/Figure_7.jpg",
        isVideo: false,
    },

    {
        index: "07",
        title: "Localized, cluster-based optimization",
        teaser:
            "Instead of optimizing the entire image sequence simultaneously, bundle adjustment is performed on overlapping clusters of images.",
        body: "Each cluster is optimized locally, while overlap between consecutive clusters provides continuity as the solution moves through the flight.",
        figureLabel: "Vid_2",
        figureCaption:
            "Sliding-window bundle adjustment over overlapping image clusters.",
        src: "/videos/Vid_2.mp4",
        isVideo: true,
    },
];

/* ---------------------------------
   CONTRIBUTIONS
---------------------------------- */

const contributions = [
    "Localized bundle adjustment across sliding clusters of overlapping images, including adjacent flight strips",
    "Geo-referenced multi-strip orientation via each image's ECEF corner coordinates",
    "Patch-constrained feature matching for faster, high-resolution correspondence search",
    "User-defined patch parameters, adaptable across UAV sensors and resolutions",
    "Direct compatibility with existing systems, including DLR's MACS",
];

/* ---------------------------------
   BIBTEX
---------------------------------- */

const bibtex = `@inproceedings{iz2025realtime,
  title = {Real-Time Bundle Adjustment for Ultra-High-Resolution UAV Imagery Using Adaptive Patch-Based Feature Tracking},
  author = {Iz, Selim Ahmet and Nex, Francesco and Kerle, Norman and Meissner, Henry and Berger, Ralf},
  booktitle = {ISPRS Annals of the Photogrammetry, Remote Sensing and Spatial Information Sciences},
  volume = {X-2/W2-2025},
  pages = {73--80},
  year = {2025},
  doi = {10.5194/isprs-annals-X-2-W2-2025-73-2025},
}`;

/* ---------------------------------
   NAV SECTIONS
   (id must match the `id` passed to <Section>)
---------------------------------- */

const navItems = [
    { id: "problem", label: "Problem" },
    { id: "method", label: "Method" },
    { id: "results", label: "Results" },
    { id: "bibtex", label: "BibTeX" },
];

/* ---------------------------------
   SCROLL REVEAL HOOK
   Lightweight IntersectionObserver-based reveal,
   respects prefers-reduced-motion.
---------------------------------- */

function useReveal<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReduced) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -120px 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return { ref, visible };
}

/* ---------------------------------
   VISUAL CARD COMPONENT
   Elevated white card with soft shadow + a corner label badge,
   used for every image / video / placeholder throughout the page
   (inspired by academic project pages like VGGT).
   Optional onClick makes it lightbox-able.

   Optional `info` renders a notebook-style page that flips open
   over the image ONLY when hovering the small "i" button (or when
   tapped, for touch devices) — hovering the rest of the image does
   nothing, so the Magnifier underneath is completely undisturbed
   until the "i" button itself is engaged.
---------------------------------- */

function VisualCard({
    label,
    children,
    caption,
    onClick,
    info,
}: {
    label: string;
    children: React.ReactNode;
    caption?: string;
    onClick?: () => void;
    info?: string;
}) {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <figure
            className={`overflow-hidden rounded-2xl border border-border/60 bg-background p-3 shadow-[0_2px_4px_rgba(15,23,42,0.06),0_16px_40px_rgba(15,23,42,0.12)] sm:p-4 ${onClick
                ? "cursor-zoom-in transition-transform duration-200 hover:-translate-y-0.5"
                : ""
                }`}
            onClick={onClick}
        >
            <div className="relative overflow-hidden rounded-xl bg-surface [perspective:1600px]">
                {/* Label */}
                <span className="absolute left-3 top-3 z-10 rounded-md bg-foreground/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-background shadow-sm backdrop-blur-sm">
                    {label}
                </span>

                {/* Info button */}
                {info && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowInfo((v) => !v);
                        }}
                        aria-label="Toggle info"
                        aria-expanded={showInfo}
                        className="peer absolute right-3 top-3 z-30 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/90 text-xs font-bold text-background shadow-sm backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95"
                    >
                        i
                    </button>
                )}

                {/* Image / video / visual content */}
                {children}

                {/* Notebook page — hinged on the RIGHT edge, swings open
                    right-to-left like a book page being turned. Closed by
                    default (folded away, invisible); opens only while the
                    "i" button is hovered/focused, or toggled via tap. */}
                {info && (
                    <div
                        className={`
                            absolute inset-0 z-20
                            origin-right
                            pointer-events-none
                            [backface-visibility:hidden]
                            [transform:rotateY(245deg)]
                            [transition:transform_0.6s_cubic-bezier(0.22,1,0.36,1)]

                            peer-hover:pointer-events-auto
                            peer-hover:[transform:rotateY(0deg)]

                            peer-focus-visible:pointer-events-auto
                            peer-focus-visible:[transform:rotateY(0deg)]

                            ${showInfo
                                ? "!pointer-events-auto ![transform:rotateY(0deg)]"
                                : ""
                            }
                        `}
                    >
                        <div
                            className="
                                flex h-full w-full flex-col gap-2
                                overflow-y-auto
                                bg-white
                                p-4
                                text-black
                                shadow-[-10px_0_25px_rgba(0,0,0,0.15),inset_2px_0_10px_rgba(0,0,0,0.08)]
                            "
                        >
                            {/* Notebook decoration */}
                            <div className="flex shrink-0 gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-black" />
                                <span className="h-2 w-2 rounded-full bg-black" />
                                <span className="h-2 w-2 rounded-full bg-black" />
                            </div>

                            {/* Info text — this wrapper stretches to fill all
                                remaining space (flex-1), so the lined pattern
                                runs all the way to the bottom of the notebook. */}
                            <div className="flex-1 [background-image:repeating-linear-gradient(transparent,transparent_27px,#000000_28px)]">
                                <p className="font-serif text-sm italic leading-[28px]">
                                    {info}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Caption */}
            {caption && (
                <figcaption className="px-1 pt-3 text-center text-sm text-muted-foreground">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

/* ---------------------------------
   MAGNIFIER
   Cursor-following zoom lens over an image.
   Desktop/hover only — disabled on touch (no hover) devices.
---------------------------------- */

const LENS_SIZE = 160;

function Magnifier({
    src,
    alt,
    imgClassName,
    wrapperClassName,
    zoom = 2.2,
}: {
    src: string;
    alt: string;
    imgClassName?: string;
    wrapperClassName?: string;
    zoom?: number;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [lens, setLens] = useState({ x: 0, y: 0, visible: false });

    const handleMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setLens({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
    };

    const rect = containerRef.current?.getBoundingClientRect();
    const bgWidth = (rect?.width ?? 0) * zoom;
    const bgHeight = (rect?.height ?? 0) * zoom;

    return (
        <div
            ref={containerRef}
            className={`relative ${wrapperClassName ?? ""}`}
            onMouseEnter={handleMove}
            onMouseMove={handleMove}
            onMouseLeave={() => setLens((prev) => ({ ...prev, visible: false }))}
        >
            <img src={src} alt={alt} loading="lazy" className={imgClassName} />
            {lens.visible && rect && (
                <div
                    className="pointer-events-none absolute hidden rounded-full border-2 border-background shadow-xl ring-1 ring-border sm:block"
                    style={{
                        width: LENS_SIZE,
                        height: LENS_SIZE,
                        left: lens.x - LENS_SIZE / 2,
                        top: lens.y - LENS_SIZE / 2,
                        backgroundImage: `url(${src})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${bgWidth}px ${bgHeight}px`,
                        backgroundPosition: `-${lens.x * zoom - LENS_SIZE / 2}px -${lens.y * zoom - LENS_SIZE / 2
                            }px`,
                    }}
                />
            )}
        </div>
    );
}

/* ---------------------------------
   LIGHTBOX
   Supports both images and videos — pass `isVideo: true` in the
   `image` object to render a <video> instead of an <img>.
---------------------------------- */

function Lightbox({
    image,
    onClose,
}: {
    image: { src: string; caption?: string; isVideo?: boolean } | null;
    onClose: () => void;
}) {
    useEffect(() => {
        if (!image) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [image, onClose]);

    if (!image) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-2xl leading-none text-white transition-colors hover:bg-background/20"
            >
                ×
            </button>
            <figure
                className="max-h-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
            >
                {image.isVideo ? (
                    <video
                        src={image.src}
                        controls
                        autoPlay
                        loop
                        playsInline
                        className="max-h-[80vh] w-full rounded-xl object-contain shadow-2xl"
                    />
                ) : (
                    <img
                        src={image.src}
                        alt={image.caption ?? ""}
                        className="max-h-[80vh] w-full rounded-xl object-contain shadow-2xl"
                    />
                )}
                {image.caption && (
                    <figcaption className="mt-4 text-center text-sm text-white/80">
                        {image.caption}
                    </figcaption>
                )}
            </figure>
        </div>
    );
}

/* ---------------------------------
   BIBTEX BLOCK WITH COPY BUTTON
---------------------------------- */

function BibtexBlock({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard API unavailable — fail silently
        }
    };

    return (
        <div className="relative mx-auto mt-6 max-w-3xl">
            <button
                onClick={handleCopy}
                className="absolute right-3 top-3 rounded-md border border-border bg-background/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-surface-strong hover:text-foreground"
            >
                {copied ? "Copied ✓" : "Copy"}
            </button>
            <pre className="overflow-x-auto rounded-xl border border-border bg-surface p-5 font-mono text-sm leading-relaxed">
                {text}
            </pre>
        </div>
    );
}

/* ---------------------------------
   METHOD FLOW DIAGRAM
   A compact, sequential pipeline overview shown at the top of the
   Method section, before the per-step breakdown. Genuinely a
   4-step sequence, so numbered steps are appropriate here.
---------------------------------- */

function MethodFlowDiagram() {
    const steps = [
        {
            n: "1",
            title: "Patch Grid",
            desc: "Each 50MP image is split into a user-defined grid of patches.",
        },
        {
            n: "2",
            title: "Terrain-Guided Tracking",
            desc: "Patches are propagated frame-to-frame via GNSS/IMU pose and DSM footprints.",
        },
        {
            n: "3",
            title: "Cross-Strip Matching",
            desc: "Patches are linked across adjacent flight strips, not just within one.",
        },
        {
            n: "4",
            title: "Cluster-Based BA",
            desc: "Overlapping image clusters are optimized locally, in real time.",
        },
    ];

    return (
        <div className="flex flex-col items-stretch gap-2 rounded-2xl border border-border/60 bg-surface p-4 sm:flex-row sm:items-stretch sm:p-5">
            {steps.flatMap((step, i) => [
                <div
                    key={`card-${step.n}`}
                    className="flex flex-1 flex-col gap-1.5 rounded-xl border border-border/60 bg-background p-4"
                >
                    <div className="flex min-h-[2.75rem] items-start gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/90 text-xs font-semibold text-background">
                            {step.n}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                            {step.title}
                        </span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                        {step.desc}
                    </p>
                </div>,
                i < steps.length - 1 ? (
                    <div
                        key={`arrow-${step.n}`}
                        className="flex items-center justify-center py-0.5 sm:px-0.5 sm:py-0"
                    >
                        <svg
                            className="h-4 w-4 rotate-90 text-muted-foreground sm:rotate-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                        >
                            <path
                                d="M9 6l6 6-6 6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                ) : null,
            ])}
        </div>
    );
}
/* ---------------------------------
   METHOD STEP
   One row of the seven-step method sequence. The figure is always
   visible; clicking it (or the "Read more" toggle) expands the
   fuller explanation beside it. Rows alternate sides on desktop to
   keep a long sequence visually varied instead of a static column.

   When step.isVideo is true, a looping/autoplaying muted <video>
   is rendered instead of the Magnifier image, and the "View full
   size" link opens the video (with controls) in the Lightbox.
---------------------------------- */

function MethodStep({
    step,
    reverse,
    onOpenImage,
}: {
    step: (typeof methodSteps)[number];
    reverse: boolean;
    onOpenImage: () => void;
}) {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen((v) => !v);

    return (
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
            <div className={reverse ? "md:order-2" : ""}>
                <button
                    type="button"
                    onClick={toggle}
                    aria-expanded={open}
                    className="group block w-full overflow-hidden rounded-2xl border border-border/60 bg-background p-3 text-left shadow-[0_2px_4px_rgba(15,23,42,0.06),0_16px_40px_rgba(15,23,42,0.12)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                    <div className="relative overflow-hidden rounded-xl bg-surface">
                        <span className="absolute left-3 top-3 z-10 rounded-md bg-foreground/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-background shadow-sm backdrop-blur-sm">
                            {step.figureLabel}
                        </span>
                        <span
                            className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/90 text-background shadow-sm transition-transform duration-300"
                            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                            aria-hidden="true"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-3.5 w-3.5"
                            >
                                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                            </svg>
                        </span>

                        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface">
                            {step.isVideo ? (
                                <video
                                    src={step.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    className="max-h-full max-w-full h-auto w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                            ) : (
                                <Magnifier
                                    src={step.src}
                                    alt={step.figureCaption}
                                    wrapperClassName="flex h-full w-full items-center justify-center"
                                    imgClassName="max-h-full max-w-full h-auto w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                            )}
                        </div>
                    </div>
                    <p className="px-1 pt-3 text-sm text-muted-foreground">
                        {step.figureCaption}
                    </p>
                </button>

                {/* Full-size view, kept separate from the text-reveal click above */}
                <button
                    type="button"
                    onClick={onOpenImage}
                    className="mt-1 px-1 text-xs font-medium text-muted-foreground/70 underline-offset-2 hover:text-foreground hover:underline"
                >
                    {step.isVideo ? "Watch full size" : "View full size"}
                </button>
            </div>

            <div className={reverse ? "md:order-1" : ""}>
                <div className="flex items-baseline gap-3">
                    <span className="font-serif text-2xl italic text-muted-foreground/40 sm:text-3xl">
                        {step.index}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        {step.title}
                    </h3>
                </div>

                <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {step.teaser}
                </p>

                <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                >
                    <div className="overflow-hidden">
                        <p className="pt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                            {step.body}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={toggle}
                    className="mt-3 text-sm font-medium text-brand hover:underline"
                >
                    {open ? "Show less" : "Read more"}
                </button>
            </div>
        </div>
    );
}

/* ---------------------------------
   STICKY NAV
---------------------------------- */

function StickyNav() {
    const handleClick = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-6 py-3 text-sm">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={handleClick(item.id)}
                        className="whitespace-nowrap rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-surface-strong hover:text-foreground"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}

/* ---------------------------------
   MAIN PAGE
---------------------------------- */

function Index() {
    const [lightboxImage, setLightboxImage] = useState<{
        src: string;
        caption?: string;
        isVideo?: boolean;
    } | null>(null);

    return (
        <main className="min-h-screen bg-background text-foreground">

            <StickyNav />

            {/* =================================
          HEADER
      ================================= */}

            <header className="border-b border-border bg-surface">
                <div className="mx-auto max-w-6xl px-6 py-16 text-center">

                    <h1 className="text-balance text-4xl leading-tight font-semibold sm:text-5xl">
                        Real-Time Bundle Adjustment for Ultra-High-Resolution UAV Imagery Using Adaptive Patch-Based Feature Tracking
                    </h1>

                    <p className="mt-3 text-sm font-medium text-muted-foreground sm:text-base">
                        ISPRS Annals, Volume X-2/W2-2025 · UAV-g 2025, Espoo, Finland
                    </p>

                    <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                        {authors.map((author, index) => (
                            <span key={author.name}>
                                <a href={author.url} className="text-brand hover:underline">
                                    {author.name}
                                </a>
                                <sup className="ml-0.5">{author.affil}</sup>
                                {index < authors.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                        <sup>1</sup> German Aerospace Center (DLR), {" "}http://localhost:8080/
                        <sup>2</sup> University of Twente
                    </p>
                    <p className="mt-2 text-2xl text-black sm:text-2xl">
                        <span className="font-bold"> Best Paper Award 🎖️</span>
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {links.map((link) =>
                            link.disabled ? (
                                <span
                                    key={link.label}
                                    className="paper-link opacity-50 cursor-not-allowed"
                                >
                                    {link.label}
                                </span>
                            ) : (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="paper-link hover:opacity-85"
                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                                >
                                    {link.label}
                                </a>
                            )
                        )}
                    </div>

                </div>
            </header>

            {/* =================================
          TEASER VIDEO
      ================================= */}

            <Section id="teaser" title="Teaser">
                <div className="mx-auto max-w-3xl">
                    <VisualCard label="Teaser" caption={teaserVideo.caption}>
                        <video
                            src={teaserVideo.src}
                            poster="/images/teaser_cover.jpg"
                            controls
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="aspect-video w-full bg-surface-strong object-cover"
                        />
                    </VisualCard>
                </div>
            </Section>

            {/* =================================
          STAT
      ================================= */}

            <Section id="stat" tone="surface">
                <div className="mx-auto max-w-3xl">
                    <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        Stat:
                    </div>
                    <div className="mt-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                        962.69s → 66.45s
                    </div>
                    <p className="mt-3 text-base text-muted-foreground">
                        Total bundle adjustment time on the same 50-megapixel dataset,
                        without downsampling or GPU acceleration.
                    </p>
                </div>
            </Section>

            {/* =================================
          PROBLEM + APPROACH + CONTRIBUTIONS
          Combined into one compact section: the narrative runs down
          the left, the contributions sit as a scannable list on the
          right, so the three ideas read together instead of as three
          separate, tall sections.
      ================================= */}

            <Section id="problem">
                <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-5 md:gap-12">
                    <div className="space-y-10 md:col-span-3">
                        <div>
                            <h2 className="section-title">Problem</h2>
                            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                                In emergency response scenarios, every second between image
                                capture and a usable map counts. Real-time missions leave
                                little room for processing: at typical UAV survey speeds,
                                keeping pace with acquisition allows only a couple of seconds
                                per image pair. Conventional bundle adjustment can't meet this
                                on 50-megapixel images (7920×6004 px) — it takes minutes per
                                dataset at their native resolution — and the usual fix,
                                shrinking the images before processing, throws away the
                                pixel-level detail these missions depend on. Onboard-capable
                                alternatives exist, but none maintain consistent orientation
                                across images from different flight strips.
                            </p>
                        </div>

                        <div>
                            <h2 className="section-title">Approach</h2>
                            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                                A cluster-based incremental bundle adjustment method, built
                                on patch-based feature tracking, that processes 50-megapixel
                                UAV images at their native resolution — no downsampling — in
                                real time and without GPU acceleration.
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="rounded-2xl border border-border/60 bg-surface p-6">
                            <h3 className="text-2xl font-semibold text-foreground">
                                Contributions
                            </h3>
                            <ul className="mt-5 space-y-3">
                                {contributions.map((item) => (
                                    <li
                                        key={item}
                                        className="flex gap-3 text-l leading-relaxed text-muted-foreground"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            {/* =================================
          WORKFLOW OVERVIEW (FIGURE 1)
      ================================= */}

            <Section id="workflow" title="Workflow Overview" tone="surface">
                <div className="mx-auto max-w-3xl">
                    <VisualCard
                        label="Figure 1"
                        caption={figure1.caption}
                        onClick={() => setLightboxImage(figure1)}
                    >
                        <Magnifier
                            src={figure1.src}
                            alt={figure1.caption}
                            imgClassName="w-full object-contain"
                        />
                    </VisualCard>
                </div>
            </Section>

            {/* =================================
          METHOD
      ================================= */}

            <Section id="method" title="Method">
                <p className="mx-auto max-w-3xl text-justify text-base leading-relaxed text-muted-foreground sm:text-lg">
                    The pipeline avoids two things conventional systems rely on: a
                    fixed image size and a GPU. Patches are tracked and matched using
                    onboard GNSS/IMU data and a coarse, globally available DSM, and
                    orientation is refined through continuous bundle adjustment over
                    overlapping image clusters — including images from adjacent
                    flight strips — as the UAV flies.
                </p>

                <div className="mx-auto mt-8 max-w-3xl">
                    <MethodFlowDiagram />
                </div>

                {/* Seven-step breakdown, each paired with its figure. Click a
                    figure (or "Read more") to reveal the full explanation. */}
                <div className="mx-auto mt-14 max-w-5xl space-y-16">
                    {methodSteps.map((step, i) => (
                        <MethodStep
                            key={step.index}
                            step={step}
                            reverse={i % 2 === 1}
                            onOpenImage={() =>
                                setLightboxImage({
                                    src: step.src,
                                    caption: `${step.figureLabel} — ${step.figureCaption}`,
                                    isVideo: step.isVideo,
                                })
                            }
                        />
                    ))}
                </div>
            </Section>

            {/* =================================
          QUANTITATIVE RESULTS (TABLE)
      ================================= */}
            <Section id="results" title="Results" tone="surface">
                <p className="mx-auto max-w-3xl text-justify text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Evaluated on a 60-image, two-strip dataset (7920×6004 px)
                    acquired with the DLR MACS during an emergency mapping mission
                    following the 2023 Türkiye earthquake, processed in MATLAB on a
                    standard laptop (13th Gen Intel Core i7, 32 GB RAM) without GPU
                    support. Geometric accuracy is maintained relative to conventional
                    incremental bundle adjustment, while total processing time drops
                    substantially — feature matching alone falls to a fraction of a
                    second thanks to patch-constrained search.
                </p>

                <div className="mx-auto mt-8 max-w-3xl">
                    <VisualCard
                        label="Table 1"
                        caption="Quantitative comparison of runtime and accuracy."
                        onClick={() =>
                            setLightboxImage({
                                src: "/images/Table_1.png",
                                caption: "Quantitative comparison of runtime and accuracy.",
                            })
                        }
                    >
                        <Magnifier
                            src="/images/Table_1.png"
                            alt="Quantitative results table"
                            imgClassName="w-full object-contain"
                        />
                    </VisualCard>
                </div>

                <div className="mx-auto mt-12 max-w-3xl">
                    <VisualCard
                        label="Figure Results"
                        caption="Comparison of cluster-based incremental BA (a), incremental BA (b), the proposed method (c)."
                        onClick={() =>
                            setLightboxImage({
                                src: "/images/Figure_results.svg",
                                caption: "Comparison of cluster-based incremental BA (a), incremental BA (b), the proposed method (c).",
                            })
                        }
                    >
                        <Magnifier
                            src="/images/Figure_results.svg"
                            alt="Comparison of cluster-based incremental BA (a), incremental BA (b), the proposed method (c)."
                            imgClassName="w-full object-contain"
                        />
                    </VisualCard>
                </div>
            </Section>

            {/* =================================
         BIBTEX
      ================================= */}

            <Section id="BibTeX" title="BibTeX">
                {/* <p className="mx-auto max-w-3xl text-center text-muted-foreground">
                    If you find this work useful for your research, please cite it as follows:
                </p> */}

                <BibtexBlock text={bibtex} />
            </Section>

            {/* =================================
          ACKNOWLEDGEMENTS
      ================================= */}

            <Section id="acknowledgements" title="Acknowledgements" tone="surface">
                <p className="mx-auto max-w-3xl text-center text-base text-muted-foreground">
                    This research was carried out with the support of the German
                    Aerospace Center (DLR) and the University of Twente.
                </p>
            </Section>

            {/* =================================
          FOOTER
      ================================= */}

            <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Selim Ahmet Iz. Hosted on GitHub Pages.</p>
            </footer>

            <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />

        </main>
    );
}

/* =================================
   SECTION COMPONENT
   Wraps children in a scroll-triggered
   fade-in / slide-up reveal.
================================= */

function Section({
    id,
    title,
    children,
    tone,
}: {
    id?: string;
    title?: string;
    children: React.ReactNode;
    tone?: "surface";
}) {
    const { ref, visible } = useReveal<HTMLDivElement>();

    return (
        <section id={id} className={tone === "surface" ? "bg-surface/60" : ""}>
            <div
                ref={ref}
                className={`mx-auto max-w-6xl px-6 py-16 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                    }`}
            >
                {title && <h2 className="section-title">{title}</h2>}
                <div className={title ? "mt-8" : ""}>{children}</div>
            </div>
        </section>
    );
}