/* Portable, sandbox-safe closing-question component: no form submission. */
function setupClosingQuestion(root, correctValue, explanation, hints) {
  const radios = Array.from(root.querySelectorAll('input[type="radio"]'));
  const feedback = root.querySelector('[role="status"]');
  const button = root.querySelector('button[data-check]');
  function check() {
    const selected = radios.find(r => r.checked);
    radios.forEach(r => r.closest('label').classList.remove('correct'));
    feedback.classList.remove('good');
    if (!selected) {
      feedback.textContent = 'Elige una respuesta y comprueba tu razonamiento.';
      return;
    }
    if (selected.value === correctValue) {
      selected.closest('label').classList.add('correct');
      feedback.classList.add('good');
      feedback.textContent = '✓ Correcto. ' + explanation;
    } else {
      feedback.textContent = hints[selected.value] || 'Revisa la demostración y vuelve a intentarlo.';
    }
  }
  radios.forEach(r => r.addEventListener('change', check));
  button.addEventListener('click', check);
  return { check };
}
