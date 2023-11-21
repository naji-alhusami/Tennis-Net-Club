export function html({ url, text }) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <div style="max-width: 40rem; padding: 20px; text-align: center; border: 5px solid #1c7f47;">
            <h2 style="color: #db981b">Welcome To TENNIS_NET_CLUB</h2>
            <p style="color: #1c7f47; font-size: 1.5rem"><b>Congratulations!</b></p>
            <p style="color: black; padding: 10px;">The last step is to verify your email by clicking on the button below.</p>
            <a href="${url}" style="background-color: #1c7f47; color: white; text-decoration: none; padding: 17px; font-size: 1rem; font-weight: bold;">${text}</a>
            <p style="color: black; padding: 10px;">If the button does not work, you can also click on the link below:</p>
            <a href="${url}">${url}</a>
          </div>
        </td>
      </tr>
    </table>`;
}
