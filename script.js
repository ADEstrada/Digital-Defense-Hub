// DATE AND TIME DISPLAY

function updateDateTime() {
   const now = new Date();
   const optionsDate = { weekday: 'short', month: 'short', day: 'numeric' };
   const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

   const datePart = now.toLocaleDateString('en-US', optionsDate);
   const timePart = now.toLocaleTimeString('en-US', optionsTime);

   const datetimeElement = document.getElementById('current-datetime');
   if (datetimeElement) {
      datetimeElement.innerHTML = `${datePart} | ${timePart}`;
      }
   }

   document.addEventListener('DOMContentLoaded', () => {
       updateDateTime();
       setInterval(updateDateTime, 1000);
   });

  document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('security-quiz');
    const resultsSection = document.getElementById('results');
    const scoreDisplay = document.getElementById('defense-score');
    const summaryDisplay = document.getElementById('defense-summary');
    const actionList = document.getElementById('action-list');
    const actionPlanInstruction = document.querySelector('.action-plan-instruction');

    const COLOR_PRIMARY = '#1e3a8a';
    const COLOR_ACCENT = '#f59e0b';
    const COLOR_DARK_RED = '#b91c1c';
    const COLOR_GREEN_ACCENT = '#16a34a';

    // --- QUIZ LOGIC ---

    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let totalScore = 0;
        let maxScore = 18;
        let actionItems = [];
        const formData = new FormData(quizForm);

        // Q1: Unique Passwords

        const q1 = parseInt(formData.get('q1'));
        totalScore += q1;
            if (q1 < 3) {
                actionItems.push('Start using a Password Manager to ensure unique passwords for every site. (See Guide 1)');
            }

        // Q2: MFA on Email

        const q2 = parseInt(formData.get('q2'));
        totalScore += q2;
            if (q2 === 0) {
                actionItems.push('IMMEDIATE: Enable Multi-Factor Authentication (MFA) on your primary email account. (See Guide 1)');
            }

        // Q3: Hover Over Links

        const q3 = parseInt(formData.get('q3'));
        totalScore += q3;
            if (q3 < 3) {
                actionItems.push('Practice hovering over links in suspicious emails before clicking. (See Guide 2)');
            }

        // Q4: VPN on Public Wi-Fi

        const q4 = parseInt(formData.get('q4'));
        totalScore += q4;
            if (q4 < 3) {
                actionItems.push('Use a VPN when connecting to public Wi-Fi to encrypt your data. (See Guide 2)');
            }

        // Q5: Automated Updates

        const q5 = parseInt(formData.get('q5'));
        totalScore += q5;
           if (q5 < 3) {
                actionItems.push('Enable automatic updates for your main operating system and browser. (See Guide 3)');
           }

        // Q6: Uninstalling Unused Apps

        const q6 = parseInt(formData.get('q6'));
        totalScore += q6;
            if (q6 < 3) {
                actionItems.push('Regularly review and uninstall unused apps, especially on mobile devices. (See Guide 3)');
            }


        // RESULT CALCULATION AND DISPLAY

        const percentage = Math.round((totalScore / maxScore) * 100);

        scoreDisplay.textContent = `${percentage}%`;

        if (percentage >= 90) {

            scoreDisplay.style.color = COLOR_GREEN_ACCENT;
            summaryDisplay.textContent = "Excellent work! Your digital defense habits are strong and highly secure.";

        } else if (percentage >= 60) {

            scoreDisplay.style.color = COLOR_ACCENT;
            summaryDisplay.textContent = "Good foundation! You have solid habits, but a few critical gaps remain.";

        } else {

            scoreDisplay.style.color = COLOR_DARK_RED;
            summaryDisplay.textContent = "Immediate attention needed. Your habits leave you vulnerable to common cyber threats.";

        }

            actionList.innerHTML = '';

        if (actionItems.length === 0) {

            actionList.innerHTML = '<li>No major actions required! Keep up the great work and stay vigilant.</li>';

            actionPlanInstruction.textContent = '✅ Excellent Security Habits';
            actionPlanInstruction.style.color = COLOR_PRIMARY;
            actionList.querySelector('li').style.backgroundColor = '#e6ffec';
            actionList.querySelector('li').style.borderLeftColor = COLOR_GREEN_ACCENT;

        } else {

            actionPlanInstruction.textContent = `⚠️ Immediate Action Plan (${actionItems.length} items)`;
            actionPlanInstruction.style.color = COLOR_DARK_RED;
            actionItems.forEach(item => {
            const li = document.createElement('li');
                li.innerHTML = item.replace('(See Guide 1)', '<a href="tips_guides.html#guide1-content"> (See Guide 1)</a>')
                    .replace('(See Guide 2)', '<a href="tips_guides.html#guide2-content"> (See Guide 2)</a>')
                    .replace('(See Guide 3)', '<a href="tips_guides.html#guide3-content"> (See Guide 3)</a>');
                     actionList.appendChild(li);
                 });
            }

            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

// LOGIC FOR DIGITAL PILLARS

function setupPillarAccordion() {

const headers = document.querySelectorAll('.pillars-content .feature-card .collapse-title');

headers.forEach(header => {
    header.addEventListener('click', () => {
        const targetId = header.getAttribute('data-target');
        const targetList = document.getElementById(targetId);
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        // Close all other open sections
         document.querySelectorAll('.pillars-content .feature-card .collapse-title[aria-expanded="true"]').forEach(openHeader => {
            if (openHeader !== header) {
                openHeader.setAttribute('aria-expanded', 'false');
                const openTargetId = openHeader.getAttribute('data-target');
                document.getElementById(openTargetId).style.maxHeight = '0';
            }
         });

         // Toggle the clicked section
         if (!isExpanded) {
            header.setAttribute('aria-expanded', 'true');
                setTimeout(() => {
                    if (targetList.scrollHeight > 0) {
                        targetList.style.maxHeight = targetList.scrollHeight + 'px';
                    } else {
                        targetList.style.maxHeight = 'auto'; // Fallback if scrollHeight is 0
                    }
                }, 0);

                    } else {
                    // Collapse
                        targetList.style.maxHeight = '0';
                        header.setAttribute('aria-expanded', 'false');
                    }
                });
            });
         }

         // Initialize all scripts on load
         window.onload = function() {
            updateDateTime(); // Initial date/time call
            setupPillarAccordion(); // Initialize the accordion functionality
         };