import { verifyWithCredentials } from "../api/auth/[...nextauth]/route";
import Thanks from "@/components/thanks/thanks";

async function verifyPage({ searchParams }) {
  const response = await verifyWithCredentials(searchParams.token);

  return (
    <div>
      <Thanks thanksMessage={response?.message} />
    </div>
  );
}

export default verifyPage;
