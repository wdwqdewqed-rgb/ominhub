function setupFaqToggle() {
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {

      const faqItem = this.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');

      const isOpen = answer.style.display === 'block';

      answer.style.display = isOpen ? 'none' : 'block';

      this.textContent = isOpen ? '+' : '−';
    });
  });

  document.querySelectorAll('.faq-answer').forEach(answer => {
    answer.style.display = 'none';
  });
}

function setupHelpCategories() {
  const helpCategories = document.querySelectorAll('.help-category');

  helpCategories.forEach(category => {
    category.addEventListener('click', function () {

      const categoryId = this.dataset.category;

      const targetFaq =
        document.getElementById(`${categoryId}-faq`);

      if (!targetFaq) return;

      targetFaq.scrollIntoView({
        behavior: 'smooth'
      });

      helpCategories.forEach(c =>
        c.classList.remove('active')
      );

      this.classList.add('active');

      const faqItems =
        targetFaq.querySelectorAll('.faq-item');

      faqItems.forEach(item => {

        item.querySelector('.faq-answer').style.display = 'block';

        item.querySelector('.faq-toggle').textContent = '−';

      });
    });
  });
}

export const SupportFaq = {
  setupFaqToggle,
  setupHelpCategories
};