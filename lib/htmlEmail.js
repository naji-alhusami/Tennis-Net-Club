export function html({ url, text }) {
  return `
  <div
  style="
    max-width: 40rem;
    text-align: center;
    border: 5px solid #1c7f47;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  "
>
  <h2 style="color: #db981b">Welcome To TENNIS_NET_CLUB</h2>
  <p><b style="color: #1c7f47; font-size: 1.5rem">Congratulations!</b></p>
  <p>You are now member of our Club.</p>
  <p>
    The last step is to verify your email by clicking on the button below.
  </p>

  <a
    href=${url}
    style="
      text-align: center;
      background-color: #1c7f47;
      color: white;
      text-decoration: none;
      padding: 20px;
    "
    onmouseover="this.style.backgroundColor = '#146135'"
    onmouseout="this.style.backgroundColor = '#1c7f47'"
    >${text}</a
  >

  <p>If the button does not work, you can also click on the link below</p>

  <div
    style="
      text-align: center;
      background-color: #1c7f47;
      color: white;
      text-decoration: none;
      padding: 20px;
    "
  >
    ${url}
  </div>
</div>
    `;
}
