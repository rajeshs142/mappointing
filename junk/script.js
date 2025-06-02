// script.js

// --- Global Variables & Constants ---
let map;
let userMarker;
let correctLocationMarker;
let infoWindow; // For displaying info on markers if needed later
let mapOverlayMarker; // For displaying 'A', 'B', 'C' on map for MCQ

const ACCEPTABLE_POINT_RADIUS_KM = 50; // How close to be "correct" for points
const DEFAULT_RANDOM_QUESTIONS = 10;

// Quiz State Variables
let currentQuizItems = [];
let currentQuestionIndex = 0;
let currentQuestion = null;
let score = 0;
let selectedMcqOption = null; // To store which MCQ button was clicked

// --- DOM Element References (to be filled in initApp or globally) ---
let mainMenuContainer, quizViewContainer, endScreenContainer;
let themedChallengesDiv, startRandomQuizBtn;
let scoreEl, questionProgressEl;
let questionTextEl, hintTextEl;
let mapContainer, mapOverlayInfoEl; // map is global
let mcqOptionsContainer, submitAnswerBtn;
let feedbackDisplayEl, feedbackTextEl, significanceTextEl, nextQuestionBtn;
let finalScoreEl, totalPossibleScoreEl, reviewIncorrectAnswersEl, playAgainMenuBtn;


// --- Initialization ---
function initApp() {
    console.log("initApp called"); // For debugging

    // Get DOM Elements
    mainMenuContainer = document.getElementById('main-menu-container');
    quizViewContainer = document.getElementById('quiz-view-container');
    endScreenContainer = document.getElementById('end-screen-container');

    themedChallengesDiv = document.getElementById('themed-challenges');
    startRandomQuizBtn = document.getElementById('startRandomQuizBtn');

    scoreEl = document.getElementById('score');
    questionProgressEl = document.getElementById('question-progress');
    questionTextEl = document.getElementById('question-text');
    hintTextEl = document.getElementById('hint-text');

    mapContainer = document.getElementById('map-container'); // The div for the map
    mapOverlayInfoEl = document.getElementById('map-overlay-info');

    mcqOptionsContainer = document.getElementById('mcq-options-container');
    submitAnswerBtn = document.getElementById('submitAnswerBtn');

    feedbackDisplayEl = document.getElementById('feedback-display');
    feedbackTextEl = document.getElementById('feedback-text');
    significanceTextEl = document.getElementById('significance-text');
    nextQuestionBtn = document.getElementById('nextQuestionBtn');

    finalScoreEl = document.getElementById('final-score');
    totalPossibleScoreEl = document.getElementById('total-possible-score');
    reviewIncorrectAnswersEl = document.getElementById('review-incorrect-answers'); // For later
    playAgainMenuBtn = document.getElementById('playAgainMenuBtn');

    // Initialize Google Map
    const INDIA_BOUNDS = { north: 37.0, south: 7.0, west: 67.0, east: 98.0 };
    const mapStyle = [ /* Using Option 1 from previous styling example */
        { featureType: "all", elementType: "labels", stylers: [{ visibility: "off" }] },
        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ visibility: "on" }, { color: "#808080" }, { weight: 0.8 }] },
        { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { weight: 1.5 }] },
        { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#888888" }, { weight: 1 }] },
        { featureType: "road", stylers: [{ visibility: "off" }] }, { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
        { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f0f0f0" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9dcec" }] }
    ];

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 22.5937, lng: 78.9629 },
        zoom: 5,
        minZoom: 4, maxZoom: 8,
        restriction: { latLngBounds: INDIA_BOUNDS, strictBounds: false },
        mapTypeControl: false, streetViewControl: false, fullscreenControl: false, zoomControl: true,
        styles: mapStyle
    });

    infoWindow = new google.maps.InfoWindow();

    // Setup Main Menu
    populateThemedChallenges();
    setupMainMenuEventListeners();

    // Initial View
    showView('menu');
    console.log("App Initialized. Showing Main Menu.");
}

// --- View Management ---
function showView(viewName) {
    mainMenuContainer.classList.replace('active-view', 'hidden-view');
    quizViewContainer.classList.replace('active-view', 'hidden-view');
    endScreenContainer.classList.replace('active-view', 'hidden-view');

    if (viewName === 'menu') {
        mainMenuContainer.classList.replace('hidden-view', 'active-view');
    } else if (viewName === 'quiz') {
        quizViewContainer.classList.replace('hidden-view', 'active-view');
    } else if (viewName === 'end') {
        endScreenContainer.classList.replace('hidden-view', 'active-view');
    }
}

// --- Main Menu Logic ---
function populateThemedChallenges() {
    const categories = {};
    allMapItems.forEach(item => {
        const key = `${item.category} - ${item.subCategory}`;
        if (!categories[key]) {
            categories[key] = [];
        }
        categories[key].push(item);
    });

    themedChallengesDiv.innerHTML = '<h3>Themed Challenges:</h3>'; // Clear previous
    for (const categoryName in categories) {
        // Only create buttons for categories that are not "Identification Only" for now,
        // or if we decide to make themed quizzes for them too.
        // For now, let's assume all categories can be themed.
        const btn = document.createElement('button');
        btn.textContent = categoryName + ` (${categories[categoryName].length} items)`;
        btn.dataset.category = categoryName; // Store for retrieval
        btn.addEventListener('click', () => startQuiz('themed', categoryName, categories[categoryName]));
        themedChallengesDiv.appendChild(btn);
    }
}

function setupMainMenuEventListeners() {
    startRandomQuizBtn.addEventListener('click', () => {
        const randomItems = shuffleArray([...allMapItems]).slice(0, DEFAULT_RANDOM_QUESTIONS);
        startQuiz('random', 'Random Review', randomItems);
    });

    playAgainMenuBtn.addEventListener('click', () => {
        showView('menu');
        // Reset any necessary game states if not already handled by startGame
    });

    // Event listener for map clicks (will be primarily used during quiz)
    map.addListener('click', handleMapClick);

    // Event listener for submit button
    submitAnswerBtn.addEventListener('click', handleSubmitAnswer);

    // Event listener for next question button
    nextQuestionBtn.addEventListener('click', loadNextQuestion);
}


// --- Helper Functions (Basic) ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- Placeholder for Quiz Logic (to be expanded) ---
function startQuiz(quizType, categoryName, items) {
    console.log(`Starting ${quizType} quiz for: ${categoryName}`);
    currentQuizItems = items;
    currentQuestionIndex = 0;
    score = 0;
    selectedMcqOption = null;

    // Reset UI elements for new quiz
    scoreEl.textContent = score;
    feedbackDisplayEl.classList.add('hidden-view');
    feedbackDisplayEl.classList.remove('correct', 'incorrect');
    nextQuestionBtn.style.display = 'none';
    submitAnswerBtn.disabled = true; // Will be enabled based on question type
    submitAnswerBtn.style.display = 'inline-block'; // Ensure it's visible


    if (!currentQuizItems || currentQuizItems.length === 0) {
        alert("No items found for this quiz. Please check locations.js");
        showView('menu');
        return;
    }

    showView('quiz');
    loadNextQuestion();
}

function loadNextQuestion() {
    // Clear previous markers and MCQ options
    if (userMarker) userMarker.setMap(null);
    if (correctLocationMarker) correctLocationMarker.setMap(null);
    if (mapOverlayMarker) mapOverlayMarker.setMap(null);
    userMarker = null;
    correctLocationMarker = null;
    mapOverlayMarker = null;
    mcqOptionsContainer.innerHTML = ''; // Clear old MCQ options
    mcqOptionsContainer.classList.add('hidden-view');
    mapOverlayInfoEl.textContent = '';
    mapOverlayInfoEl.style.display = 'none';
    feedbackDisplayEl.classList.add('hidden-view');
    nextQuestionBtn.style.display = 'none';
    submitAnswerBtn.disabled = true; // Re-disable for the new question
    submitAnswerBtn.style.display = 'inline-block';
    selectedMcqOption = null;


    if (currentQuestionIndex < currentQuizItems.length) {
        currentQuestion = currentQuizItems[currentQuestionIndex];
        questionTextEl.textContent = currentQuestion.questionText;
        hintTextEl.textContent = currentQuestion.hint ? `Hint: ${currentQuestion.hint}` : "";
        questionProgressEl.textContent = `${currentQuestionIndex + 1}/${currentQuizItems.length}`;

        if (currentQuestion.type === 'point') {
            // Enable map clicking - user will place a pin
            feedbackTextEl.textContent = "Place your pin on the map and click 'Submit Guess'.";
            // Submit button will be enabled by handleMapClick
        } else if (currentQuestion.type === 'identify_region_mcq') {
            feedbackTextEl.textContent = "Select the correct option below.";
            mcqOptionsContainer.classList.remove('hidden-view');
            currentQuestion.mcqOptions.forEach(optionText => {
                const btn = document.createElement('button');
                btn.textContent = optionText;
                btn.addEventListener('click', (e) => handleMcqOptionSelect(e.target, optionText));
                mcqOptionsContainer.appendChild(btn);
            });
            // Display the marker label (A, B, C) on the map if info exists
            if (currentQuestion.mapMarkerInfo && currentQuestion.mapMarkerInfo.markerLabel) {
                mapOverlayInfoEl.textContent = currentQuestion.mapMarkerInfo.markerLabel;
                mapOverlayInfoEl.style.display = 'block';
                // Ideally, place a non-interactive, visible marker on map for context
                // For now, the text overlay is a simpler visual cue.
                // We need a representative lat/lng for this marker if we draw one.
                // This part needs more thought for "targetAreaDescription" from locations.js
            }
            submitAnswerBtn.disabled = true; // Enabled when an MCQ option is selected
        }
    } else {
        endQuiz();
    }
}

function handleMapClick(event) {
    if (!currentQuestion || currentQuestion.type !== 'point' || !quizViewContainer.classList.contains('active-view') || submitAnswerBtn.disabled === false && nextQuestionBtn.style.display !== 'none') {
        // Only allow pin placement if it's a point question, quiz view is active, and answer not yet submitted for current Q
        return;
    }

    if (userMarker) {
        userMarker.setMap(null);
    }
    userMarker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        draggable: true, // Allow user to adjust
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }
    });
    submitAnswerBtn.disabled = false; // Enable submit once pin is placed
    feedbackTextEl.textContent = "Pin placed. Click 'Submit Guess'.";
}

function handleMcqOptionSelect(buttonEl, optionText) {
    // Remove 'selected' class from previously selected button
    const currentlySelected = mcqOptionsContainer.querySelector('.selected');
    if (currentlySelected) {
        currentlySelected.classList.remove('selected');
    }
    // Add 'selected' class to the clicked button
    buttonEl.classList.add('selected');
    selectedMcqOption = optionText;
    submitAnswerBtn.disabled = false; // Enable submit once an option is chosen
}


function handleSubmitAnswer() {
    if (!currentQuestion) return;
    submitAnswerBtn.disabled = true; // Prevent multiple submissions

    let isCorrect = false;
    let resultInfo = {}; // To store distance or choice for feedback

    if (currentQuestion.type === 'point') {
        if (!userMarker) {
            alert("Please place a pin on the map first!");
            submitAnswerBtn.disabled = false; // Re-enable
            return;
        }
        const userPosition = userMarker.getPosition();
        const correctPosition = new google.maps.LatLng(currentQuestion.lat, currentQuestion.lng);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(userPosition, correctPosition) / 1000; // km

        isCorrect = distance <= ACCEPTABLE_POINT_RADIUS_KM;
        resultInfo.distance = distance;
        if (userMarker) userMarker.setDraggable(false); // Lock user marker

    } else if (currentQuestion.type === 'identify_region_mcq') {
        if (!selectedMcqOption) {
            alert("Please select an option!");
            submitAnswerBtn.disabled = false; // Re-enable
            return;
        }
        isCorrect = selectedMcqOption === currentQuestion.correctOption;
        resultInfo.selected = selectedMcqOption;
        resultInfo.correct = currentQuestion.correctOption;
    }

    if (isCorrect) {
        score++;
        scoreEl.textContent = score;
    }
    showFeedback(isCorrect, resultInfo);
}


function showFeedback(isCorrect, resultInfo) {
    feedbackDisplayEl.classList.remove('hidden-view', 'correct', 'incorrect');
    feedbackDisplayEl.classList.add(isCorrect ? 'correct' : 'incorrect');

    let feedbackMsg = "";
    if (currentQuestion.type === 'point') {
        feedbackMsg = isCorrect ? `Correct! Well done.` : `Not quite. That was ${resultInfo.distance.toFixed(1)} km away.`;
        // Show correct location marker
        correctLocationMarker = new google.maps.Marker({
            position: { lat: currentQuestion.lat, lng: currentQuestion.lng },
            map: map,
            title: "Correct: " + currentQuestion.name,
            icon: { url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }
        });
        map.panTo({ lat: currentQuestion.lat, lng: currentQuestion.lng }); // Center on correct answer
    } else if (currentQuestion.type === 'identify_region_mcq') {
        feedbackMsg = isCorrect ? `Correct! The answer is ${currentQuestion.correctOption}.`
                                : `Incorrect. You chose ${resultInfo.selected}. The correct answer was ${currentQuestion.correctOption}.`;
        // For MCQ, no additional map marker needed beyond the initial 'A', 'B', 'C' if used
        // We might want to highlight the correct MCQ option visually here.
    }

    feedbackTextEl.textContent = feedbackMsg;
    significanceTextEl.textContent = `Significance: ${currentQuestion.significance || "Not available."}`;
    nextQuestionBtn.style.display = 'inline-block';
    submitAnswerBtn.style.display = 'none'; // Hide submit after feedback shown for current Q
}


function endQuiz() {
    finalScoreEl.textContent = score;
    totalPossibleScoreEl.textContent = currentQuizItems.length;
    // reviewIncorrectAnswersEl.innerHTML = "<p>Review will be here.</p>"; // Implement later
    showView('end');
}


// Make sure initApp is called after the Google Maps script loads
// The `callback=initApp` in the Google Maps script URL handles this.