import SectionPage from "@/components/SectionPage";

type SectionPageProps = {
  params: Promise<{ section: string }>;
};

export default async function SectionRoute({ params }: SectionPageProps) {
  const { section } = await params;
  return <SectionPage sectionId={section} />;
}
