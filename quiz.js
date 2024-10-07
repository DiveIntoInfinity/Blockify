const quizData = [
    {
        question: "Which cryptographic algorithm is used in Bitcoin for generating digital signatures?",
        options: ["RSA", "ECDSA", "SHA-256", "AES"],
        correct: 1,
    },

    {
        question: "What problem does the Byzantine Fault Tolerance (BFT) model address in blockchain systems?",
        options: ["Double-spending problem", "Network latency issues", "Consensus in the presence of faulty or malicious nodes", "Scalability challenges"],
        correct: 2,
    },

    {
        question: "What does 'sharding' refer to in the context of blockchain scalability?",
        options: ["Splitting a blockchain into different layers", "Using sidechains for off-chain transactions", "Partitioning the blockchain into smaller pieces for parallel processing", "Creating a second layer for faster transaction processing"],
        correct: 2,
        roadmap: [
            "Study scalability issues in blockchains.",
            "Learn how sharding improves scalability."
        ]
    },
    {
        question: "Which of the following blockchains uses the Proof of History (PoH) consensus mechanism?",
        options: ["Solana", "Polkadot", "Tezos", "Cardano"],
        correct: 0,
        roadmap: [
            "Study consensus mechanisms and their types.",
            "Explore how PoH works in Solana."
        ]
    },
    {
        question: "What is the function of the 'nonce' in blockchain mining?",
        options: ["To encrypt the transaction data", "To ensure the block header meets the required difficulty level", "To manage peer-to-peer node communication", "To verify the digital signature of transactions"],
        correct: 1,
        roadmap: [
            "Learn how PoW uses the nonce.",
            "Implement a mining algorithm to understand its functionality."
        ]
    },

    {
        question: "What is a 'hard fork' in blockchain?",
        options: ["An upgrade that maintains backward compatibility", "A temporary split in the blockchain due to network latency", "A permanent divergence creating two separate blockchains", "A change in consensus rules without splitting the blockchain"],
        correct: 2,
        roadmap: [
            "Learn the difference between hard forks and soft forks.",
            "Study examples like Bitcoin vs Bitcoin Cash."
        ]
    },
    {
        question: "What role does gas play in the Ethereum blockchain?",
        options: ["To speed up block creation", "To measure the computational effort required to execute transactions", "To reward miners for creating blocks", "To verify the validity of smart contracts"],
        correct: 1,
        roadmap: [
            "Learn how gas is calculated in Ethereum.",
            "Explore how gas fees fluctuate based on network congestion."
        ]
    },
    {
        question: "What is 'zk-SNARK' used for in blockchain?",
        options: ["Increasing transaction speed", "Enabling privacy by proving possession of information without revealing it", "Reducing storage requirements for nodes", "Improving mining efficiency"],
        correct: 1,
        roadmap: [
            "Learn about zero-knowledge proofs in cryptography.",
            "Study projects like Zcash that use zk-SNARKs."
        ]
    },

    {
        question: "In which blockchain consensus algorithm does a leader randomly select validators?",
        options: ["Proof of Stake", "Delegated Proof of Stake", "Proof of Elapsed Time", "Liquid Proof of Stake"],
        correct: 1,
        roadmap: [
            "Learn how validators are elected in DPoS.",
            "Study blockchains like EOS and TRON."
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
    clearInterval(timer);
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
    document.getElementById("quiz-container").innerHTML = `
        <h2>Your Final Score: ${score}/100</h2>
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
    window.location.href = "index.html";
}

window.onload = loadQuestion;
