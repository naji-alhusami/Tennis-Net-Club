import Thanks from "@/components/thanks/thanks";
import { verifyWithCredentials } from "../api/auth/[...nextauth]/route";

async function verifyPage({ searchParams }) {
  const response = await verifyWithCredentials(searchParams.token);

  return (
    <div>
      <Thanks thanksMessage={response?.message} />
    </div>
  );
}

export default verifyPage;
