document.addEventListener('DOMContentLoaded', function() {

    const toggleBtn = document.getElementById('toggle-table-btn');
    const tableWrapper = document.getElementById('table-wrapper');
    const tableContainer = document.getElementById('table-container');
    const resultsContainer = document.getElementById('results-container');
    const faqBtn = document.getElementById('faq-btn');
    
    let isTableCreated = false; // Переменная для отслеживания, создана ли таблица

    // Слушатель для кнопки "Создать/Скрыть"
    toggleBtn.addEventListener('click', function() {
        if (!isTableCreated) {
            createWeekTable();
            isTableCreated = true;
        }
        tableWrapper.classList.toggle('hidden');
    });

    faqBtn.addEventListener('click', function() {
        alert("Часто задаваемые вопросы:\n\nВ: Этот сайт бесплатный?\nО: Да, абсолютно!\n\nВ: Кто вы такие?\nО: Мы команда энтузиастов, которая хочет помочь тебе!");
    });

    // Функция создания таблицы
    function createWeekTable() {
        tableContainer.innerHTML = '';
        const table = document.createElement('table');
        const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const headerRow = document.createElement('tr');
        const headers = ["День недели", "Планы на день", "Желаемый отдых (часы)"];
        
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        daysOfWeek.forEach(day => {
            const row = document.createElement('tr');
            
            const dayCell = document.createElement('td');
            dayCell.textContent = day;
            row.appendChild(dayCell);
            
            const plansCell = document.createElement('td');
            const plansInput = document.createElement('input');
            plansInput.type = 'text';
            plansInput.placeholder = 'Например: Сделать химию, сходить в зал...';
            plansCell.appendChild(plansInput);
            row.appendChild(plansCell);
            
            const restCell = document.createElement('td');
            const restInput = document.createElement('input');
            restInput.type = 'number';
            restInput.min = '0';
            restInput.max = '24';
            restInput.placeholder = 'ч.';
            restInput.className = 'rest-hours'; // Важный класс для расчетов
            restCell.appendChild(restInput);
            row.appendChild(restCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);

        // Находим кнопку "Рассчитать" ТОЛЬКО ПОСЛЕ создания таблицы
        const calculateBtn = document.getElementById('calculate-btn');
        calculateBtn.addEventListener('click', calculateRest);
    }

    // Функция для расчета
    function calculateRest() {
        // Находим все поля для ввода часов отдыха по их классу
        const restInputs = document.querySelectorAll('.rest-hours');
        let totalRest = 0;
        let filledDays = 0;

        restInputs.forEach(input => {
            const hours = parseFloat(input.value);
            if (!isNaN(hours) && hours > 0) {
                totalRest += hours;
                filledDays++;
            }
        });

        if (filledDays > 0) {
            const averageRest = (totalRest / filledDays).toFixed(1); // Округляем до одного знака
            resultsContainer.innerHTML = `
                <p><strong>Общее время отдыха за неделю:</strong> ${totalRest} ч.</p>
                <p><strong>Среднее время отдыха в день:</strong> ${averageRest} ч.</p>
            `;
        } else {
            resultsContainer.innerHTML = `<p>Пожалуйста, введите желаемое время отдыха хотя бы для одного дня.</p>`;
        }
        
        resultsContainer.style.display = 'block'; // Показываем блок с результатами
    }
});