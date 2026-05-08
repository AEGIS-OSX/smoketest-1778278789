import Image from "next/image";

const projectImages = {
  hero: {
    src: "https://zkvkbpxrxnfynqqeytke.supabase.co/storage/v1/object/public/marketing-assets/smoketest-1778278789/cleo/1778279391110-hero.png",
    alt: "Editorial still life of a brass leash clasp on matte charcoal, cropped to the right of the headline.",
    width: 1536,
    height: 1024,
  },
  feature_1: {
    src: "https://zkvkbpxrxnfynqqeytke.supabase.co/storage/v1/object/public/marketing-assets/smoketest-1778278789/cleo/1778279379373-feature_1.png",
    alt: "Leash hardware and a schedule card arranged on a matte charcoal tabletop with a moss green tray.",
    width: 1536,
    height: 1024,
  },
  feature_2: {
    src: "https://zkvkbpxrxnfynqqeytke.supabase.co/storage/v1/object/public/marketing-assets/smoketest-1778278789/cleo/1778279377178-feature_2.png",
    alt: "Brass clock, leash, and dog tag on cream stone against charcoal.",
    width: 1536,
    height: 1024,
  },
  feature_3: {
    src: "https://zkvkbpxrxnfynqqeytke.supabase.co/storage/v1/object/public/marketing-assets/smoketest-1778278789/cleo/1778279367820-feature_3.png",
    alt: "Calm dog at a charcoal apartment entry with brass hardware and a cropped handler hand.",
    width: 1536,
    height: 1024,
  },
  social_proof: {
    src: "https://zkvkbpxrxnfynqqeytke.supabase.co/storage/v1/object/public/marketing-assets/smoketest-1778278789/cleo/1778279360484-social_proof.png",
    alt: "Leash looped over a mid-century chair, brass tag visible.",
    width: 1536,
    height: 1024,
  },
} as const;

export type ProjectImageId = keyof typeof projectImages;

type ProjectImageProps = {
  id: ProjectImageId;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ProjectImage({
  id,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ProjectImageProps) {
  const image = projectImages[id];

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={className}
      priority={priority ?? id === "hero"}
      sizes={sizes}
    />
  );
}

export default ProjectImage;
