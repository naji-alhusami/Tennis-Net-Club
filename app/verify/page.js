import Thanks from "@/components/thanks/thanks";
import { verifyWithCredentials } from "../api/auth/[...nextauth]/route";

async function verifyPage({ searchParams }) {
  const response = await verifyWithCredentials(searchParams.token);

  // console.log(searchParams.token);
  return (
    <div>
      <Thanks thanksMessage={response?.message} />
      {/* <h1>{response?.message}</h1> */}
    </div>
  );
}

export default verifyPage;
