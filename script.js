async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const userText = input.value.trim();
    if (!userText) return alert("Type something!");

    const captcha = grecaptcha.getResponse();
    if (!captcha) return alert("Please verify reCAPTCHA");

    chatBox.innerHTML += `<div class="message user">${userText}</div>`;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText })
    });

    const data = await response.json();
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    chatBox.innerHTML += `<div class="message bot">${botReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    grecaptcha.reset();
}
