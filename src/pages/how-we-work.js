/* Redirect old /how-we-work URL to /aboutus for SEO */
export async function getServerSideProps() {
  return {
    redirect: { destination: "/aboutus", permanent: true },
  };
}

export default function HowWeWork() {
  return null;
}
