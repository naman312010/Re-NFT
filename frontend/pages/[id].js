import { useRouter } from "next/router";

function NFTDetails(props) {
  const router = useRouter();
  return <h1>{`your nft id ${router.query.id}`}</h1>;
}

// export async function getStaticPaths() {
//   // Return a list of possible value for id
// }

export async function getServerSideProps({ params }) {
  // Fetch nft data
  //const NFTData = getPostData(params.id);
  //   if (!NFTData) return {
  //       notFound: true;
  //   }
  return {
    props: {
    //   NFTData,
    },
  };
}

export default NFTDetails;
