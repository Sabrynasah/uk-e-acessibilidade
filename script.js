document.addEventListener('DOMContentLoaded', () => {
  // --- CONTROLE DE TAMANHO DE FONTE ---
  const btnAumentar = document.getElementById('btn-fonte-aumentar');
  const btnDiminuir = document.getElementById('btn-fonte-diminuir');
  let tamanhoFonte = 100;

  btnAumentar.addEventListener('click', () => {
    if (tamanhoFonte < 150) {
      tamanhoFonte += 10;
      document.documentElement.style.fontSize = `${tamanhoFonte}%`;
    }
  });

  btnDiminuir.addEventListener('click', () => {
    if (tamanhoFonte > 80) {
      tamanhoFonte -= 10;
      document.documentElement.style.fontSize = `${tamanhoFonte}%`;
    }
  });

  // --- CONTROLE DE ALTO CONTRASTE ---
  const btnAltoContraste = document.getElementById('btn-alto-contraste');
  btnAltoContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
    const estaAtivo = document.body.classList.contains('alto-contraste');
    btnAltoContraste.setAttribute('aria-pressed', estaAtivo);
  });

  // --- GERENCIAMENTO DE MODAL ACESSÍVEL ---
  const modal = document.getElementById('modal-inscricao');
  const btnAbrirModal = document.getElementById('btn-abrir-modal');
  const btnFecharModal = document.getElementById('btn-fechar-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  let elementoFocadoAntesDoModal = null;

  function abrirModal() {
    elementoFocadoAntesDoModal = document.activeElement;
    modal.removeAttribute('hidden');
    
    // Focar no primeiro elemento focável dentro do modal
    const primeiroElementoFocavel = modal.querySelector('input, button');
    if (primeiroElementoFocavel) primeiroElementoFocavel.focus();

    document.addEventListener('keydown', gerenciarTeclasModal);
  }

  function fecharModal() {
    modal.setAttribute('hidden', 'true');
    document.removeEventListener('keydown', gerenciarTeclasModal);
    
    // Retornar o foco para o elemento original
    if (elementoFocadoAntesDoModal) elementoFocadoAntesDoModal.focus();
  }

  // Prender o foco dentro do modal (Trap Focus) e aceitar ESC para fechar
  function gerenciarTeclasModal(e) {
    if (e.key === 'Escape') {
      fecharModal();
      return;
    }

    if (e.key === 'Tab') {
      const elementosFocaveis = modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const primeiro = elementosFocaveis[0];
      const ultimo = elementosFocaveis[elementosFocaveis.length - 1];

      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }
  }

  btnAbrirModal.addEventListener('click', abrirModal);
  btnFecharModal.addEventListener('click', fecharModal);
  modalOverlay.addEventListener('click', fecharModal);
});