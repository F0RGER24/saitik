document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-sleep');
    const bedtimeInput = document.getElementById('bedtime');
    const resultsDiv = document.getElementById('sleep-results');
    const wakeupTimesDiv = document.getElementById('wakeup-times');

    calculateBtn.addEventListener('click', function() {
        calculateWakeUpTimes();
    });

    function calculateWakeUpTimes() {
        const bedtime = bedtimeInput.value;
        if (!bedtime) {
            alert('Пожалуйста, введите время отхода ко сну');
            return;
        }

        const [hours, minutes] = bedtime.split(':').map(Number);
        const bedtimeDate = new Date();
        bedtimeDate.setHours(hours, minutes, 0, 0);

        // Рассчитываем время подъема для 4, 5, 6 циклов сна (каждый цикл = 90 минут)
        const cycles = [4, 5, 6]; // 6, 7.5, 9 часов сна
        const cycleDuration = 90; // минут в одном цикле сна

        let resultsHTML = '';

        cycles.forEach(cycle => {
            const wakeupTime = new Date(bedtimeDate.getTime() + cycle * cycleDuration * 60000);
            const formattedTime = wakeupTime.toTimeString().substring(0, 5);
            const totalSleepHours = (cycle * cycleDuration / 60).toFixed(1);
            
            resultsHTML += `
                <div class="wakeup-option">
                    <strong>${formattedTime}</strong> - ${totalSleepHours} часов сна (${cycle} цикла)
                </div>
            `;
        });

        wakeupTimesDiv.innerHTML = resultsHTML;
        resultsDiv.classList.remove('hidden');
    }
});