export function html({ url, text }) {
  return `
    <div>
      <h2>Welcome To TENNIS_NET_CLUB</h2>
      <p>Congratulations! You are now member of our Tennis Club.</p>
      <p>
        The last step is to verify your email by clicking on the button below.
      </p>

      <a href=${url}>${text}</a>

      <p>If the button does not work, you can also click on the link below</p>

      <div>${url}</div>
    </div>
    `;
}
