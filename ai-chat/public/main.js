const form = document.getElementById('question-form');
const questionInput = document.getElementById('question');
const statusEl = document.getElementById('status');
const answerEl = document.getElementById('answer');
const submitButton = document.getElementById('submit-button');

async function askQuestion(question) {
  const response = await fetch('/api/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody && errorBody.error ? errorBody.error : 'Request failed.';
    throw new Error(message);
  }

  const data = await response.json();
  return data.answer || '';
}

function setLoading(isLoading) {
  if (isLoading) {
    statusEl.textContent = 'Thinking...';
    submitButton.disabled = true;
  } else {
    statusEl.textContent = '';
    submitButton.disabled = false;
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const question = questionInput.value.trim();
  if (!question) {
    statusEl.textContent = 'Please enter a question before submitting.';
    questionInput.focus();
    return;
  }

  setLoading(true);
  answerEl.innerHTML = '';

  try {
    const answer = await askQuestion(question);

    if (!answer) {
      answerEl.textContent = 'No answer was returned.';
    } else {
      const p = document.createElement('p');
      p.textContent = answer;
      answerEl.appendChild(p);
    }
  } catch (err) {
    console.error(err);
    answerEl.textContent = err.message || 'Something went wrong.';
  } finally {
    setLoading(false);
  }
});

