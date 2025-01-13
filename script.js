console.log("This is my script");

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("username");
  const submitBtn = document.getElementById("submitBtn");

  // Disable the button initially
  submitBtn.disabled = true;

  // Add an event listener to the input field
  emailInput.addEventListener("input", () => {
    // Enable the button if the input is not empty
    submitBtn.disabled = emailInput.value.trim() === "";
  });
});

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("Clicked!");
  resultCont.innerHTML = `<img width="123px" src="img/loading.svg" alt="Loading...">`;

  let key = "ema_live_OpkZhHY4I5cm7i0sYNGL7M1Q1r6asfk0WdisdQst"; // Replace with your actual API key
  let email = document.getElementById("username").value;
  let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

  try {
    let res = await fetch(url);
    let result = await res.json();
    console.log("API Response:", result);

    let fieldDescriptions = {
      email: "The email address you entered for validation.",
      user: "The username extracted from the email address.",
      tag: "An optional tag associated with the email (if present).",
      domain: "The domain part of the email address.",
      smtp_check: "Indicates if the SMTP server was checked successfully.",
      mx_found:
        "Shows whether the domain has valid MX (mail exchange) records.",
      did_you_mean: "Suggested correction for typos in the email address.",
      role: "Specifies if the email address is associated with a role (e.g., admin).",
      disposable: "Indicates if the email is from a disposable email provider.",
      score: "A confidence score indicating email deliverability (0 to 1).",
      state: "The current deliverability status of the email.",
      reason: "Reason for the email's deliverability status.",
      free: "Indicates if the email belongs to a free email provider (e.g., Gmail).",
      format_valid: "Shows whether the email format is valid.",
      catch_all: "Specifies if the domain accepts all emails (catch-all).",
    };

    let str = `<h3>Validation Results for: <strong>${result.email}</strong></h3>`;
    str += `<table style="width: 100%; border-collapse: collapse;">`;
    str += `<tr style="background-color: #333; text-align: left;">
              <th style="padding: 10px; border: 1px solid #ddd;">Field</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Value</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Description</th>
            </tr>`;

    for (let key of Object.keys(result)) {
      if (result[key] !== "" && result[key] !== " ") {
        str += `<tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${key}</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${
                    result[key]
                  }</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${
                    fieldDescriptions[key] || "No description available."
                  }</td>
                </tr>`;
      }
    }

    str += `</table>`;
    resultCont.innerHTML = str;
  } catch (error) {
    console.error("Error fetching API:", error);
    resultCont.innerHTML = `<p style="color: red;">An error occurred while validating the email. Please try again.</p>`;
  }
});
