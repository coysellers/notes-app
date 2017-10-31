(function(doc) {
    const selectClass = (className) => doc.querySelector(className)
        cardsList = selectClass('.card-list'),
        cardsForm = selectClass('.card-form'),
        activeClass = selectClass('.active-modal'),
        warningModal = selectClass('.modal'),
        closeModal = selectClass('.close-modal'),
        clearAll = selectClass('.confirm-delete'),
        cards = JSON.parse(localStorage.getItem('cards')) || [];

    fillCardsList(cards);

    cardsForm.addEventListener('submit', function (e) {
        const title = selectClass('.input').value,
            description = selectClass('.textarea').value,
            card = {
                title: title,
                description: description
            };

        e.preventDefault();

        if (!title || description === '') return;

        cards.push(card);
        fillCardsList(cards);
        storeCards(cards);
        cardsForm.reset();
    });

    function fillCardsList(cards = []) {
        cardsList.innerHTML = cards.map((card, i) => {
            return `
                <article class="message is-dark data-id="${i}"">
                    <div class="message-header">
                        <p>${card.title}</p>
                        <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        ${card.description}
                    </div>
                </article>
            `;
        }).join('');
    }

    function storeCards(cards = []) {
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    cardsList.addEventListener('click', function (e) {
        const target = e.target,
            index = target.parentNode.parentNode.dataset.id;

        if (!target.matches('.delete')) return;

        cards.splice(index, 1);

        fillCardsList(cards);
        storeCards(cards);
    });

    function isActive(e) {
        warningModal.classList.toggle('is-active');

        e.preventDefault();
    }

    clearAll.addEventListener('click', function () {
        cards.splice(0, cards.length);

        fillCardsList(cards);
        storeCards(cards);

        warningModal.classList.remove('is-active');
    });

    activeClass.addEventListener('click', isActive);
    closeModal.addEventListener('click', isActive);
})(document);