  
    // State
    let currentStep = 1;
    let userData = { name: '', email: '' };
    let timeLeft = 121; // 2:01 in seconds
    let timerInterval = null;

    // Navigation
    function goToStep(step) {
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      document.getElementById('step' + step).classList.add('active');
      currentStep = step;

      if (step === 3) {
        startTimer();
      }
    }

    // Form validation
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      
      let hasError = false;
      
      // Reset errors
      nameError.style.display = 'none';
      emailError.style.display = 'none';
      
      // Validate name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        nameError.style.display = 'block';
        hasError = true;
      }
      
      // Validate email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        hasError = true;
      } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Invalid email address';
        emailError.style.display = 'block';
        hasError = true;
      }
      
      if (!hasError) {
        userData.name = nameInput.value;
        userData.email = emailInput.value;
        
        // Update success page
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userEmail').textContent = userData.email;
        
        goToStep(3);
      }
    }

    // Timer
    function startTimer() {
      if (timerInterval) clearInterval(timerInterval);
      
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          const mins = Math.floor(timeLeft / 60);
          const secs = timeLeft % 60;
          document.getElementById('timer').textContent = 
            mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
        } else {
          clearInterval(timerInterval);
        }
      }, 1000);
    }
