import { verifyWithCredentials } from "@/actions/signupActions";

async function verifyPage({ searchParams }) {
  const response = await verifyWithCredentials(searchParams.token);

  // console.log(searchParams.token);
  return (
    <div>
      <h1>{response?.message}</h1>
    </div>
  );
}

export default verifyPage;
