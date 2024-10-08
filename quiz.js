const quizData = [
    {
        question: "What is a blockchain?",
        options: ["A type of cryptocurrency", "A decentralized ledger of transactions", "A digital wallet", "A mining algorithm"],
        correct: 1,
        roadmap: [
            "Learn about the structure and purpose of a blockchain.",
            "Understand how blockchain stores data in a decentralized way."
        ]
    },

    {
        question: "Which of the following is a key feature of blockchain technology?",
        options: ["Centralized authority", "Transparency and immutability", "Data stored in a single location", "Manual verification of transactions"],
        correct: 1,
        roadmap: [
            "Study the core features of blockchain: decentralization, immutability, and transparency.",
            "Explore how these features improve security and trust."
        ]
    },

    {
        question: "What is a 'block' in blockchain?",
        options: ["A cryptocurrency wallet", "A set of transactions bundled together", "A smart contract", "A digital signature"],
        correct: 1,
        roadmap: [
            "Understand how blocks store transaction data.",
            "Learn how blocks link together to form a blockchain."
        ]
    },

    {
        question: "Which of the following blockchains was the first to introduce smart contracts?",
        options: ["Bitcoin", "Ethereum", "Ripple", "Litecoin"],
        correct: 1,
        roadmap: [
            "Study the concept of smart contracts on Ethereum.",
            "Explore how smart contracts automate agreements."
        ]
    },

    {
        question: "What is cryptocurrency mining?",
        options: ["Creating new cryptocurrencies", "Validating and adding new transactions to the blockchain", "Trading cryptocurrencies on an exchange", "Setting up a blockchain network"],
        correct: 1,
        roadmap: [
            "Learn about the role of miners in maintaining blockchain integrity.",
            "Explore how mining works in Proof of Work (PoW) systems."
        ]
    },

    {
        question: "What is a 'wallet' in cryptocurrency?",
        options: ["A digital file that stores public and private keys", "A blockchain node", "A type of blockchain consensus", "A cryptocurrency exchange"],
        correct: 0,
        roadmap: [
            "Learn how cryptocurrency wallets store and manage keys.",
            "Understand the difference between hot wallets and cold wallets."
        ]
    },

    {
        question: "What does a 'decentralized' system mean in the context of blockchain?",
        options: ["A system controlled by a central authority", "A system where data is stored on multiple nodes", "A system where only one user holds all data", "A system where data is stored in one server"],
        correct: 1,
        roadmap: [
            "Understand how decentralization improves security and resilience.",
            "Learn about the benefits of decentralized networks."
        ]
    },

    {
        question: "What is the purpose of a public key in blockchain?",
        options: ["To encrypt transactions", "To serve as a unique address for receiving cryptocurrencies", "To store blockchain data", "To verify transactions manually"],
        correct: 1,
        roadmap: [
            "Learn about public and private key cryptography.",
            "Understand how public keys are used in transactions."
        ]
    },

    {
        question: "What is the primary purpose of a consensus mechanism in blockchain?",
        options: ["To ensure all transactions are valid", "To create new cryptocurrencies", "To reduce transaction fees", "To provide a digital wallet"],
        correct: 0,
        roadmap: [
            "Study how consensus mechanisms maintain blockchain integrity.",
            "Learn about different types of consensus like PoW, PoS, and DPoS."
        ]
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            showNextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    document.getElementById("result").textContent = "";
    const questionData = quizData[currentQuestion];
    document.getElementById("question").textContent = `${currentQuestion + 1}. ${questionData.question}`;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    questionData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
    document.getElementById("progress").textContent = `${currentQuestion + 1} of ${quizData.length} Questions`;
    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;
    clearInterval(timer);
    startTimer();
}

function checkAnswer(selected) {
    clearInterval(timer);
    const correct = quizData[currentQuestion].correct;
    const options = document.getElementsByClassName("option");
    Array.from(options).forEach((btn, idx) => {
        if (idx === correct) {
            btn.classList.add("correct");
        }
        if (idx === selected && selected !== correct) {
            btn.classList.add("incorrect");
            document.getElementById("result").innerHTML = `
                <div>Suggested Roadmap to Improve:</div>
                <ul>
                    ${quizData[currentQuestion].roadmap.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        }
        btn.onclick = null;
    });
    if (selected === correct) {
        score += 10;
        document.getElementById("score").textContent = `Score: ${score} / 100`;
    }
    document.getElementById("next-btn").style.display = "block";
}

function showNextQuestion() {
    document.getElementById("next-btn").style.display = "none";
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function nextQuestion() {
    showNextQuestion();
}

function showFinalScore() {
    const tokens = score / 10;
    const solana = tokens * 0.000001;

    document.getElementById("quiz-container").innerHTML = `
        <h2>Your Final Score: ${score} / 100</h2>
        <p>You've earned ${tokens} tokens!</p>
        <p>Token value in Solana: ${solana.toFixed(6)} SOL</p>
        <button class="btn" onclick="playAgain()">Play Again</button>
        <button class="btn" onclick="goHome()">Home</button>`;
}

function playAgain() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("quiz-container").innerHTML = `
        <div id="score">Score: 0 / 100</div>
        <div id="timer">Time Left: <span id="time">10</span>s</div>
        <div id="question"></div>
        <div id="options"></div>
        <div id="result"></div>
        <button id="next-btn" class="btn" onclick="nextQuestion()">Next</button>
        <div id="progress">1 of ${quizData.length} Questions</div>
    `;
    loadQuestion();
}

function goHome() {
    window.location.href = "home.html";
}

window.onload = loadQuestion;
