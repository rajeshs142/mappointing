// script.js

// --- Global Variables & Constants ---
let map;
let userMarker;
let correctLocationMarker;
let infoWindow; // For displaying info on markers if needed later
let mapOverlayMarker; // For displaying 'A', 'B', 'C' on map for MCQ
let viewAllLocationsBtn;

let studyModeMarkers = []; // To keep track of markers in study mode
let currentStudyingSectionName = "";
let currentStudyingSectionItems = [];

const ACCEPTABLE_POINT_RADIUS_KM = 100; // How close to be "correct" for points
const DEFAULT_RANDOM_QUESTIONS = 15;

// Default map center and zoom for India
const DEFAULT_INDIA_CENTER = { lat: 22.5937, lng: 78.9629 };
const DEFAULT_INDIA_ZOOM = 5; // Adjust as needed, 5 is a good overview

const MAP_ID_COLORFUL = "f8aa7b5bfa481b5a423c36dc";
const MAP_ID_EXAM_WITH_STATES = "f8aa7b5bfa481b5a784041bc";
const MAP_ID_EXAM_NO_STATES = "f8aa7b5bfa481b5a8231a404";

// Quiz State Variables
let currentQuizItems = [];
let currentQuestionIndex = 0;
let currentQuestion = null;
let score = 0;
let selectedMcqOption = null; // To store which MCQ button was clicked

// --- DOM Element References (to be filled in initApp or globally) ---
let historySectionsDiv, geographySectionsDiv, startRandomQuizBtnSidebar;
let toggleHintsCheckbox, toggleDarkModeCheckbox, toggleSignificanceCheckbox;

// Question Interaction Pane
let quizActiveMessageEl, quizContentAreaEl, endScreenContentEl;
let currentQuizTitleEl, scoreEl, questionProgressEl;
let questionTextEl, hintTextEl;
let mcqOptionsContainer, submitAnswerBtn;
let feedbackDisplayEl, feedbackTextEl, significanceTextEl, nextQuestionBtn;
let finalScoreEl, totalPossibleScoreEl, returnToSectionsBtn;

let leftSidebarPane, sidebarToggleBtn, sidebarTitleFull, sidebarTitleCollapsed;
let mobileHeader, mobileSidebarToggle;
let mobileOverlay; // Optional: Add to HTML: <div class="mobile-overlay"></div>

let studyModeContentEl, studyModeTitleEl, studyItemsListEl;
let returnToSectionsFromStudyBtn, startQuizFromStudyBtn;

let toggleStudyLabelsCheckbox;
let toggleStateBoundariesCheckbox, toggleColorfulMapCheckbox;

let mobileSidebarCloseBtn; // New
let mobileMenuOverlay; // New

// --- Settings ---
let showHints = true;
let showSignificance = true;
let showStudyLabels = true; // New setting state, default to true
let showStateBoundaries = true; // Default to true
let useColorfulMap = false; // Default to false (exam style)
//
// map_with_state_borders style id -  bd015186890efaefdf9079a6
// map_without_state_borders style id -  bd015186890efaefc1a7fd29
// default india map - bd015186890efaef11eae25e
// --- Define Map Styles ---
// We need to store our map style configurations
const examStyleMapConfig = [
  // Your black and white + state boundaries style
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0E87CC" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ visibility: "on" }, { color: "#000000" }, { weight: 0.8 }],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#000000" }, { weight: 1.5 }, { visibility: "on" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#000000" }, { weight: 0.8 }, { visibility: "on" }],
  }, // State boundaries
  { featureType: "road", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];
// const mapStyle = [ /* ... your map style ... */
//     { featureType: "all", elementType: "labels", stylers: [{ visibility: "off" }] },
//     { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ visibility: "on" }, { color: "var(--border-color)" }, { weight: 0.8 }] },
//     { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { weight: 1.5 }] }, // Use CSS vars
//     { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#333333" }, { weight: 1 }, { visibility: "on" }] }, // Use CSS vars
//     { featureType: "road", stylers: [{ visibility: "off" }] }, { featureType: "poi", stylers: [{ visibility: "off" }] },
//     { featureType: "transit", stylers: [{ visibility: "off" }] },
//     { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#ffffff" }] }, // Use CSS vars
//     { featureType: "water", elementType: "geometry", stylers: [{ color: "#f0f0f0" }] } // A light blue for water
// ];
const examStyleMapNoStateBoundariesConfig = [
  // Black and white, NO state boundaries
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#dddddd" }, visibility],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ visibility: "on" }, { color: "#000000" }, { weight: 0.8 }],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#000000" }, { weight: 1.5 }, { visibility: "on" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#ffffff" }, { visibility: "on" }],
  }, // Hide state boundaries
  { featureType: "road", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

const colorfulMapConfig = null; // `null` or `[]` will revert to Google Maps default colorful style

// --- Initialization ---
function initApp() {
  console.log("initApp called - Advanced Layout");

  // --- Get DOM Elements ---

  // Left Sidebar
  historySectionsDiv = document.getElementById("history-sections");
  geographySectionsDiv = document.getElementById("geography-sections");
  startRandomQuizBtnSidebar = document.getElementById(
    "startRandomQuizBtnSidebar"
  );
  toggleHintsCheckbox = document.getElementById("toggleHints");
  toggleDarkModeCheckbox = document.getElementById("toggleDarkMode");
  toggleSignificanceCheckbox = document.getElementById("toggleSignificance");

  // Question Interaction Pane
  quizActiveMessageEl = document.getElementById("quiz-active-message");
  quizContentAreaEl = document.getElementById("quiz-content-area");
  endScreenContentEl = document.getElementById("end-screen-content");
  currentQuizTitleEl = document.getElementById("current-quiz-title");
  scoreEl = document.getElementById("score");
  questionProgressEl = document.getElementById("question-progress");
  questionTextEl = document.getElementById("question-text");
  hintTextEl = document.getElementById("hint-text");
  mcqOptionsContainer = document.getElementById("mcq-options-container");
  submitAnswerBtn = document.getElementById("submitAnswerBtn");
  feedbackDisplayEl = document.getElementById("feedback-display");
  feedbackTextEl = document.getElementById("feedback-text");
  significanceTextEl = document.getElementById("significance-text");
  nextQuestionBtn = document.getElementById("nextQuestionBtn");
  finalScoreEl = document.getElementById("final-score");
  totalPossibleScoreEl = document.getElementById("total-possible-score");
  returnToSectionsBtn = document.getElementById("returnToSectionsBtn");
  viewAllLocationsBtn = document.getElementById("viewAllLocationsBtn");

  // Map Pane
  mapOverlayInfoEl = document.getElementById("map-overlay-info"); // map is global

  leftSidebarPane = document.getElementById("left-sidebar-pane");
  sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");
  sidebarTitleFull = document.querySelector(".sidebar-title-full"); // Use querySelector for class
  sidebarTitleCollapsed = document.querySelector(".sidebar-title-collapsed");

  mobileHeader = document.getElementById("mobile-header");
  mobileSidebarToggle = document.getElementById("mobile-sidebar-toggle");

  studyModeContentEl = document.getElementById("study-mode-content");
  studyModeTitleEl = document.getElementById("study-mode-title");
  studyItemsListEl = document.getElementById("study-items-list");
  returnToSectionsFromStudyBtn = document.getElementById(
    "returnToSectionsFromStudyBtn"
  );
  startQuizFromStudyBtn = document.getElementById("startQuizFromStudyBtn");

  toggleStudyLabelsCheckbox = document.getElementById("toggleStudyLabels");
  toggleStateBoundariesCheckbox = document.getElementById(
    "toggleStateBoundaries"
  );
  toggleColorfulMapCheckbox = document.getElementById("toggleColorfulMap");

  mobileSidebarCloseBtn = document.getElementById("mobile-sidebar-close-btn");
  mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

  // Initialize Google Map (same styling as before)
  // ... (map initialization code - ensure map div ID is 'map') ...
  const INDIA_BOUNDS = { north: 37.0, south: 7.0, west: 67.0, east: 98.0 };
  // const mapStyle = [ /* ... your map style ... */
  //     { featureType: "all", elementType: "labels", stylers: [{ visibility: "off" }] },
  //     { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ visibility: "on" }, { color: "var(--border-color)" }, { weight: 0.8 }] },
  //     { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { weight: 1.5 }] }, // Use CSS vars
  //     { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#333333" }, { weight: 1 }, { visibility: "on" }] }, // Use CSS vars
  //     { featureType: "road", stylers: [{ visibility: "off" }] }, { featureType: "poi", stylers: [{ visibility: "off" }] },
  //     { featureType: "transit", stylers: [{ visibility: "off" }] },
  //     { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#ffffff" }] }, // Use CSS vars
  //     { featureType: "water", elementType: "geometry", stylers: [{ color: "#f0f0f0" }] } // A light blue for water
  // ];
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 22.5937, lng: 78.9629 },
    zoom: 5,
    minZoom: 4,
    maxZoom: 8,
    restriction: { latLngBounds: INDIA_BOUNDS, strictBounds: false },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    mapId: "artful-oxygen-461006-f4",
    styles: getCurrentMapStyle(), // Apply style based on initial settings
  });

  // Read initial settings from checkboxes
  showStateBoundaries = toggleStateBoundariesCheckbox.checked;
  useColorfulMap = toggleColorfulMapCheckbox.checked;
  toggleStateBoundariesCheckbox.disabled = useColorfulMap; // Initial state

  // Create the map for the first time
  createMap(); // New function to handle map creation/re-creation

  infoWindow = new google.maps.InfoWindow();

  // Populate Sections Sidebar
  populateSectionsSidebar();

  // Setup Event Listeners
  setupGlobalEventListeners();
  setupSettingsListeners();
  setupSidebarToggles();

  // Initial View State in Question Pane
  showQuestionPaneView("initialMessage");
  console.log("App Initialized. Showing initial message.");
}

// --- View Management for Question Pane ---
function showQuestionPaneView(viewName) {
  quizActiveMessageEl.classList.replace("active-view", "hidden-view");
  quizContentAreaEl.classList.replace("active-view", "hidden-view");
  endScreenContentEl.classList.replace("active-view", "hidden-view");
  studyModeContentEl.classList.replace("active-view", "hidden-view"); // Add this

  if (viewName === "initialMessage") {
    quizActiveMessageEl.classList.replace("hidden-view", "active-view");
  } else if (viewName === "quizActive") {
    quizContentAreaEl.classList.replace("hidden-view", "active-view");
  } else if (viewName === "endScreen") {
    endScreenContentEl.classList.replace("hidden-view", "active-view");
  } else if (viewName === "studyMode") {
    // Add this case
    studyModeContentEl.classList.replace("hidden-view", "active-view");
  }
}

// --- Populate Sections Sidebar ---
function populateSectionsSidebar() {
  const categories = { History: {}, Geography: {} };
  allMapItems.forEach((item) => {
    if (!categories[item.category]) categories[item.category] = {};
    if (!categories[item.category][item.subCategory]) {
      categories[item.category][item.subCategory] = [];
    }
    categories[item.category][item.subCategory].push(item);
  });

  const createSectionEntry = (containerDiv, subCategoryName, items) => {
    const group = document.createElement("div");
    group.className = "section-item-group";

    const quizBtn = document.createElement("button");
    quizBtn.className = "start-quiz-for-section-btn";
    quizBtn.title = `Start quiz for ${subCategoryName}`;
    quizBtn.textContent = `${subCategoryName} (${items.length})`;
    quizBtn.addEventListener("click", () => startQuiz(subCategoryName, items));

    const viewAllBtn = document.createElement("button");
    viewAllBtn.className = "view-all-for-section-btn";
    viewAllBtn.innerHTML = "View"; // Search icon
    viewAllBtn.title = `View all answers for ${subCategoryName}`;
    viewAllBtn.addEventListener("click", () =>
      showAllAnswersForSection(subCategoryName, items)
    );

    group.appendChild(quizBtn);
    group.appendChild(viewAllBtn);
    containerDiv.appendChild(group);
  };

  historySectionsDiv.innerHTML = '<h4 class="nav-title-full">History</h4>';
  for (const subCategory in categories.History) {
    createSectionEntry(
      historySectionsDiv,
      subCategory,
      categories.History[subCategory]
    );
  }

  geographySectionsDiv.innerHTML = '<h4 class="nav-title-full">Geography</h4>';
  for (const subCategory in categories.Geography) {
    createSectionEntry(
      geographySectionsDiv,
      subCategory,
      categories.Geography[subCategory]
    );
  }
}

// --- Settings Logic ---
function setupSettingsListeners() {
  toggleHintsCheckbox.addEventListener("change", (e) => {
    showHints = e.target.checked;
    applyHintVisibility(); // Apply immediately if a question is active
  });
  toggleDarkModeCheckbox.addEventListener("change", (e) => {
    document.body.classList.toggle("dark-mode", e.target.checked);
    // Note: Google Map style needs to be dynamically updated for dark mode for full effect
    // This is more advanced; for now, only app UI changes.
  });
  toggleSignificanceCheckbox.addEventListener("change", (e) => {
    showSignificance = e.target.checked;
    applySignificanceVisibility();
  });
  toggleStudyLabelsCheckbox.addEventListener("change", (e) => {
    // New Listener
    showStudyLabels = e.target.checked;
    updateStudyModeMarkersLabels(); // Update existing markers if study mode is active
  });
  toggleStateBoundariesCheckbox.addEventListener("change", (e) => {
    showStateBoundaries = e.target.checked;
    console.log("State Boundaries Toggled:", showStateBoundaries);
    createMap(); // Re-create map with new Map ID
  });

  toggleColorfulMapCheckbox.addEventListener("change", (e) => {
    useColorfulMap = e.target.checked;
    console.log("Colorful Map Toggled:", useColorfulMap);
    toggleStateBoundariesCheckbox.disabled = useColorfulMap;
    createMap(); // Re-create map with new Map ID
  });
  // Initial state of the disable for state boundaries checkbox
  toggleStateBoundariesCheckbox.disabled = toggleColorfulMapCheckbox.checked;
}

function updateStudyModeMarkersLabels() {
  if (studyModeContentEl.classList.contains("active-view")) {
    // Only if study mode is active
    studyModeMarkers.forEach((marker) => {
      if (showStudyLabels) {
        // Re-create the label object. The text for the label needs to be stored
        // or re-derived when the marker was initially created.
        // We'll assume the marker's 'title' can be used or a data attribute.
        // For simplicity, let's assume we stored the intended label text on the marker.
        if (marker.customLabelText) {
          // Check if we stored it
          marker.setLabel({
            text: marker.customLabelText, // Use stored label text
            color: "black",
            fontWeight: "bold",
            fontSize: "10px",
            className: "map-marker-label",
          });
        }
      } else {
        marker.setLabel(null); // Remove the label
      }
    });
  }
}

function applyHintVisibility() {
  if (hintTextEl) {
    hintTextEl.classList.toggle("hidden-by-setting", !showHints);
  }
}
function applySignificanceVisibility() {
  if (significanceTextEl) {
    significanceTextEl.classList.toggle("hidden-by-setting", !showSignificance);
  }
}

// --- Global Event Listeners (for buttons not tied to dynamic content) ---
function setupGlobalEventListeners() {
  startRandomQuizBtnSidebar.addEventListener("click", () => {
    const randomItems = shuffleArray([...allMapItems]).slice(
      0,
      DEFAULT_RANDOM_QUESTIONS
    );
    startQuiz("Random Review", randomItems);
  });

  viewAllLocationsBtn.addEventListener("click", () => {
    // Call showAllAnswersForSection with all items
    showAllAnswersForSection("All Syllabus Locations", allMapItems);
  });

  map.addListener("click", handleMapClick); // From previous script
  submitAnswerBtn.addEventListener("click", handleSubmitAnswer); // From previous script
  nextQuestionBtn.addEventListener("click", () => {
    // From previous script
    currentQuestionIndex++;
    loadNextQuestion();
  });
  returnToSectionsBtn.addEventListener("click", () => {
    clearAllMapMarkers();

    showQuestionPaneView("initialMessage");
    // Potentially reset map zoom/pan here
    if (
      window.innerWidth > 768 &&
      leftSidebarPane.classList.contains("collapsed")
    ) {
      leftSidebarPane.classList.remove("collapsed"); // Or leave it collapsed
      updateSidebarToggleIcon();
    }
  });

  startQuizFromStudyBtn.addEventListener("click", () => {
    if (currentStudyingSectionName && currentStudyingSectionItems.length > 0) {
      clearAllMapMarkers(); // Clear study markers
      startQuiz(currentStudyingSectionName, currentStudyingSectionItems);
    } else {
      alert("No section selected for study or section is empty.");
      showQuestionPaneView("initialMessage");
    }
  });
}

// --- Quiz Logic (startQuiz, loadNextQuestion, handleSubmitAnswer, showFeedback, endQuiz) ---
// These functions will be very similar to the previous `script.js`
// but will update elements within the `#question-interaction-pane`.
function startQuiz(quizTitle, items) {
  console.log(`Starting quiz: ${quizTitle}`);
  currentQuizItems = items;
  currentQuestionIndex = 0;
  score = 0;
  selectedMcqOption = null;

  // --- Reset Map View ---
  if (map) {
    // Ensure map object exists
    clearAllMapMarkers(); // Clear any study mode or previous quiz markers
    map.setCenter(DEFAULT_INDIA_CENTER);
    map.setZoom(DEFAULT_INDIA_ZOOM);
    console.log("Map view reset for new quiz.");
  }
  // --- End of Reset Map View ---

  currentQuizTitleEl.textContent = quizTitle;
  scoreEl.textContent = score;
  // Reset UI elements for new quiz (feedback, buttons, etc.)
  feedbackDisplayEl.classList.add("hidden-view");
  feedbackDisplayEl.classList.remove("correct", "incorrect");
  nextQuestionBtn.style.display = "none";
  submitAnswerBtn.disabled = true;
  submitAnswerBtn.style.display = "inline-block";

  if (!currentQuizItems || currentQuizItems.length === 0) {
    quizActiveMessageEl.innerHTML = `<p>No items found for "${quizTitle}". Please select another.</p>`;
    showQuestionPaneView("initialMessage");
    return;
  }

  showQuestionPaneView("quizActive");
  loadNextQuestion(); // This will load the first question and potentially pan/zoom to an MCQ marker

  // Auto-collapse/close sidebar (this logic should already be here from previous steps)
  if (window.innerWidth > 768) {
    if (!leftSidebarPane.classList.contains("collapsed")) {
      leftSidebarPane.classList.add("collapsed");
      updateSidebarToggleIcon();
    }
  } else {
    if (leftSidebarPane.classList.contains("mobile-sidebar-open")) {
      leftSidebarPane.classList.remove("mobile-sidebar-open");
      if (mobileMenuOverlay) mobileMenuOverlay.classList.remove("active");
    }
  }
}

function loadNextQuestion() {
  if (currentQuestionIndex === 0) {
    // Only fully clear if it's the first question of a new quiz attempt
    // Markers specific to the *previous* quiz question were cleared by clearAllMapMarkers in startQuiz
    // or before loading THIS question if it's not the first.
    clearAllMapMarkers();
  }
  // Clear previous markers, MCQ options, etc. (same as before)
  if (userMarker) userMarker.setMap(null);
  if (correctLocationMarker) correctLocationMarker.setMap(null);
  if (mapOverlayMarker) mapOverlayMarker.setMap(null);
  userMarker = null;
  correctLocationMarker = null;
  mapOverlayMarker = null;
  mcqOptionsContainer.innerHTML = "";
  mcqOptionsContainer.classList.add("hidden-view");
  // mapOverlayInfoEl.textContent = '';
  // mapOverlayInfoEl.style.display = 'none';
  feedbackDisplayEl.classList.add("hidden-view");
  nextQuestionBtn.style.display = "none";
  submitAnswerBtn.disabled = true;
  submitAnswerBtn.style.display = "inline-block";
  selectedMcqOption = null;

  if (currentQuestionIndex < currentQuizItems.length) {
    currentQuestion = currentQuizItems[currentQuestionIndex];
    questionTextEl.textContent = currentQuestion.questionText;
    hintTextEl.textContent = currentQuestion.hint
      ? `${currentQuestion.hint}`
      : "";
    applyHintVisibility(); // Apply setting
    questionProgressEl.textContent = `${currentQuestionIndex + 1}/${
      currentQuizItems.length
    }`;

    if (currentQuestion.type === "point") {
      // UI ready for map click
    } else if (currentQuestion.type === "identify_region_mcq") {
      mcqOptionsContainer.classList.remove("hidden-view");
      currentQuestion.mcqOptions.forEach((optionText) => {
        const btn = document.createElement("button");
        btn.textContent = optionText;
        btn.addEventListener("click", (e) =>
          handleMcqOptionSelect(e.target, optionText)
        );
        mcqOptionsContainer.appendChild(btn);
      });

      // --- THIS IS THE CRUCIAL PART FOR THE MCQ REGION MARKER ---
      if (
        currentQuestion.mapMarkerInfo &&
        currentQuestion.mapMarkerInfo.label &&
        typeof currentQuestion.mapMarkerInfo.lat === "number" && // Ensure lat/lng are numbers
        typeof currentQuestion.mapMarkerInfo.lng === "number"
      ) {
        // Create the content for the AdvancedMarkerElement (the 'A', 'B', 'C' label)
        const regionMarkerLabelElement = document.createElement("div");
        regionMarkerLabelElement.textContent =
          currentQuestion.mapMarkerInfo.label;
        regionMarkerLabelElement.style.padding = "5px 8px";
        regionMarkerLabelElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Dark semi-transparent background
        regionMarkerLabelElement.style.color = "white";
        regionMarkerLabelElement.style.borderRadius = "50%"; // Make it circular
        regionMarkerLabelElement.style.fontSize = "16px";
        regionMarkerLabelElement.style.fontWeight = "bold";
        regionMarkerLabelElement.style.textAlign = "center";
        regionMarkerLabelElement.style.minWidth = "25px"; // Ensure circle looks decent
        regionMarkerLabelElement.style.minHeight = "25px";
        regionMarkerLabelElement.style.display = "flex";
        regionMarkerLabelElement.style.alignItems = "center";
        regionMarkerLabelElement.style.justifyContent = "center";
        regionMarkerLabelElement.style.border = "1px solid white";

        mapOverlayMarker = new google.maps.marker.AdvancedMarkerElement({
          position: {
            lat: currentQuestion.mapMarkerInfo.lat,
            lng: currentQuestion.mapMarkerInfo.lng,
          },
          map: map,
          content: regionMarkerLabelElement,
          title: `Region ${currentQuestion.mapMarkerInfo.label}: ${
            currentQuestion.targetAreaDescription || currentQuestion.name
          }`, // Tooltip
          // gmpDraggable: false, // Default
          // zIndex: google.maps.Marker.MAX_ZINDEX + 1, // Make it appear on top if needed
        });
        // Pan to the marker so user can see it clearly
        map.panTo({
          lat: currentQuestion.mapMarkerInfo.lat,
          lng: currentQuestion.mapMarkerInfo.lng,
        });
        map.setZoom(6); // Adjust zoom as needed to show context
      } else {
        // Fallback if mapMarkerInfo is incomplete for a map marker
        console.warn(
          "MapMarkerInfo for identify_region_mcq is incomplete. No map marker shown for:",
          currentQuestion.name
        );
        // You could display the old text overlay as a fallback if desired:
        // if (currentQuestion.mapMarkerInfo && currentQuestion.mapMarkerInfo.markerLabel) {
        //     mapOverlayInfoEl.textContent = currentQuestion.mapMarkerInfo.markerLabel;
        //     mapOverlayInfoEl.style.display = 'block';
        // }
      }
    }
  } else {
    endQuiz();
  }
}

function handleMapClick(event) {
  // Similar to before
  if (
    !quizContentAreaEl.classList.contains("active-view") || // Check if quiz content is active
    !currentQuestion ||
    currentQuestion.type !== "point" ||
    (submitAnswerBtn.disabled === false &&
      nextQuestionBtn.style.display !== "none")
  ) {
    return;
  }
  if (userMarker) userMarker.setMap(null);
  userMarker = new google.maps.Marker({
    position: event.latLng,
    map: map,
    draggable: true,
    icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" },
  });
  submitAnswerBtn.disabled = false;
}

function handleMcqOptionSelect(buttonEl, optionText) {
  // Similar to before
  const currentlySelected = mcqOptionsContainer.querySelector(".selected");
  if (currentlySelected) currentlySelected.classList.remove("selected");
  buttonEl.classList.add("selected");
  selectedMcqOption = optionText;
  submitAnswerBtn.disabled = false;
}

function handleSubmitAnswer() {
  // Similar to before
  if (!currentQuestion) return;
  submitAnswerBtn.disabled = true;
  let isCorrect = false;
  let resultInfo = {};

  if (currentQuestion.type === "point") {
    if (!userMarker) {
      alert("Please place a pin!");
      submitAnswerBtn.disabled = false;
      return;
    }
    const userPos = userMarker.getPosition();
    const correctPos = new google.maps.LatLng(
      currentQuestion.lat,
      currentQuestion.lng
    );
    resultInfo.distance =
      google.maps.geometry.spherical.computeDistanceBetween(
        userPos,
        correctPos
      ) / 1000;
    isCorrect = resultInfo.distance <= ACCEPTABLE_POINT_RADIUS_KM;
    if (userMarker) userMarker.setDraggable(false);
  } else if (currentQuestion.type === "identify_region_mcq") {
    if (!selectedMcqOption) {
      alert("Please select an option!");
      submitAnswerBtn.disabled = false;
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
  // Similar, but applies visibility setting
  feedbackDisplayEl.classList.remove("hidden-view", "correct", "incorrect");
  feedbackDisplayEl.classList.add(isCorrect ? "correct" : "incorrect");
  let feedbackMsg = ""; // Build feedback message as before
  if (currentQuestion.type === "point") {
    feedbackMsg = isCorrect
      ? `Correct! Well done.`
      : `Not quite. That was ${resultInfo.distance.toFixed(1)} km away.`;
    correctLocationMarker = new google.maps.Marker({
      position: { lat: currentQuestion.lat, lng: currentQuestion.lng },
      map: map,
      title: "Correct: " + currentQuestion.name,
      icon: { url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" },
    });
    map.panTo({ lat: currentQuestion.lat, lng: currentQuestion.lng });
  } else if (currentQuestion.type === "identify_region_mcq") {
    feedbackMsg = isCorrect
      ? `Correct! The answer is ${currentQuestion.correctOption}.`
      : `Incorrect. You chose ${resultInfo.selected}. Correct: ${currentQuestion.correctOption}.`;
  }
  feedbackTextEl.textContent = feedbackMsg;
  significanceTextEl.textContent =
    currentQuestion.significance || "Significance not available.";
  applySignificanceVisibility(); // Apply setting

  nextQuestionBtn.style.display = "inline-block";
  submitAnswerBtn.style.display = "none";
}

function endQuiz() {
  finalScoreEl.textContent = score;
  totalPossibleScoreEl.textContent = currentQuizItems.length;
  showQuestionPaneView("endScreen");
}

// --- Helper Functions ---
function shuffleArray(array) {
  /* ... same as before ... */
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// --- Modify/Add to setupSidebarToggles() or where mobile toggle logic is ---
function setupSidebarToggles() {
  // Desktop toggle
  sidebarToggleBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    leftSidebarPane.classList.toggle("collapsed");
    updateSidebarToggleIcon();
  });

  // Mobile hamburger toggle (in main content's mobile header)
  mobileSidebarToggle.addEventListener("click", () => {
    leftSidebarPane.classList.add("mobile-sidebar-open"); // Use add, not toggle
    mobileMenuOverlay.classList.add("active");
  });

  // New: Mobile sidebar internal close button
  mobileSidebarCloseBtn.addEventListener("click", () => {
    leftSidebarPane.classList.remove("mobile-sidebar-open");
    mobileMenuOverlay.classList.remove("active");
  });

  // New: Click on overlay to close mobile sidebar
  mobileMenuOverlay.addEventListener("click", () => {
    leftSidebarPane.classList.remove("mobile-sidebar-open");
    mobileMenuOverlay.classList.remove("active");
  });

  // Desktop: Click on the sidebar pane itself to expand if collapsed
  leftSidebarPane.addEventListener("click", (event) => {
    // Prevent this from firing if a button inside the sidebar was clicked
    if (event.target !== leftSidebarPane) {
      return;
    }
    if (
      window.innerWidth > 768 &&
      leftSidebarPane.classList.contains("collapsed")
    ) {
      leftSidebarPane.classList.remove("collapsed");
      updateSidebarToggleIcon();
    }
  });
}
// Make sure updateSidebarToggleIcon changes the icon appropriately
function updateSidebarToggleIcon() {
  if (leftSidebarPane.classList.contains("collapsed")) {
    sidebarToggleBtn.innerHTML = "<span>☰</span>"; // Hamburger / Expand
    sidebarToggleBtn.setAttribute("aria-label", "Expand Sidebar");
  } else {
    sidebarToggleBtn.innerHTML = "<span>←</span>"; // Left arrow / Collapse
    sidebarToggleBtn.setAttribute("aria-label", "Collapse Sidebar");
  }
}

// --- New Function: showAllAnswersForSection() ---
function showAllAnswersForSection(sectionName, items) {
  console.log(`Showing all answers for: ${sectionName}`);
  currentStudyingSectionName = sectionName;
  currentStudyingSectionItems = items;

  clearAllMapMarkers();
  studyModeMarkers = [];

  studyModeTitleEl.textContent = `Viewing All Answers for: ${sectionName}`;
  studyItemsListEl.innerHTML = "";

  const bounds = new google.maps.LatLngBounds();

  items.forEach((item) => {
    // Add item to the list in question pane (same as before)
    // ... (card creation logic) ...
    const card = document.createElement("div");
    card.className = "study-item-card";
    card.innerHTML = `
            <h4>${item.name}</h4>
            <p><strong>Significance:</strong> ${item.significance}</p>
            ${
              item.hint ? `<p class="hint"><em>Hint: ${item.hint}</em></p>` : ""
            }
        `;
    card.addEventListener("click", () => {
      if (
        (item.type === "point" && item.lat && item.lng) ||
        (item.type === "identify_region_mcq" &&
          item.mapMarkerInfo &&
          item.mapMarkerInfo.lat &&
          item.mapMarkerInfo.lng)
      ) {
        let targetLat =
          item.type === "point" ? item.lat : item.mapMarkerInfo.lat;
        let targetLng =
          item.type === "point" ? item.lng : item.mapMarkerInfo.lng;
        map.panTo({ lat: targetLat, lng: targetLng });
        map.setZoom(8);
      }
    });
    studyItemsListEl.appendChild(card);

    let markerLat,
      markerLng,
      markerLabelTextForDisplay,
      markerTitle,
      actualLabelTextForStorage;

    if (item.type === "point" && item.lat && item.lng) {
      markerLat = item.lat;
      markerLng = item.lng;
      actualLabelTextForStorage = item.name; // Store the full name
      markerTitle = item.name;
    } else if (
      item.type === "identify_region_mcq" &&
      item.mapMarkerInfo &&
      item.mapMarkerInfo.lat &&
      item.mapMarkerInfo.lng
    ) {
      markerLat = item.mapMarkerInfo.lat;
      markerLng = item.mapMarkerInfo.lng;
      actualLabelTextForStorage = `${item.mapMarkerInfo.label}: ${item.correctOption}`;
      markerTitle = `${item.name} (Region for ${item.mapMarkerInfo.label} - ${item.correctOption})`;
    }

    // Determine if label should be shown based on current setting
    markerLabelTextForDisplay = showStudyLabels
      ? actualLabelTextForStorage
      : null;

    if (markerLat !== undefined && markerLng !== undefined) {
      const markerOptions = {
        position: { lat: markerLat, lng: markerLng },
        map: map,
        title: markerTitle,
      };

      if (markerLabelTextForDisplay) {
        // Only add label object if text is not null
        markerOptions.label = {
          text: markerLabelTextForDisplay,
          color: "black",
          fontWeight: "bold",
          fontSize: "10px",
          className: "map-marker-label",
        };
      }

      const marker = new google.maps.Marker(markerOptions);
      marker.customLabelText = actualLabelTextForStorage; // Store the original label text on the marker object

      const infowindowHTML = `
                <div class="custom-infowindow-content">
                    <h4>${item.name}</h4>
                    <p>${item.significance}</p>
                    ${
                      item.type === "identify_region_mcq"
                        ? `<p><strong>Correct Answer:</strong> ${item.correctOption}</p>`
                        : ""
                    }
                </div>
            `;

      marker.addListener("click", () => {
        infoWindow.setContent(infowindowHTML); // Set our custom HTML
        infoWindow.open(map, marker);
      });

      studyModeMarkers.push(marker);
      bounds.extend(marker.getPosition());

      // Auto-collapse/close sidebar when study mode is entered
    }
    if (window.innerWidth > 768) {
      // Desktop
      if (!leftSidebarPane.classList.contains("collapsed")) {
        leftSidebarPane.classList.add("collapsed");
        updateSidebarToggleIcon();
      }
    } else {
      // Mobile
      if (leftSidebarPane.classList.contains("mobile-sidebar-open")) {
        leftSidebarPane.classList.remove("mobile-sidebar-open");
        mobileMenuOverlay.classList.remove("active");
      }
    }
  });

  if (studyModeMarkers.length > 0) {
    map.fitBounds(bounds);
    // Adjust zoom after fitBounds if necessary, especially for few markers
    google.maps.event.addListenerOnce(map, "bounds_changed", function () {
      if (this.getZoom() > 10 && studyModeMarkers.length <= 3) {
        // Don't zoom in too much for few markers
        this.setZoom(8);
      } else if (this.getZoom() > 12) {
        // General max zoom after fitBounds
        this.setZoom(12);
      }
    });
  } else if (items.length > 0) {
    map.setCenter({ lat: 22.5937, lng: 78.9629 });
    map.setZoom(5);
  }

  showQuestionPaneView("studyMode");

  // Auto-collapse sidebar logic (same as before)
  if (
    window.innerWidth > 768 &&
    !leftSidebarPane.classList.contains("collapsed")
  ) {
    leftSidebarPane.classList.add("collapsed");
    updateSidebarToggleIcon();
  } else if (
    window.innerWidth <= 768 &&
    leftSidebarPane.classList.contains("mobile-sidebar-open")
  ) {
    leftSidebarPane.classList.remove("mobile-sidebar-open");
  }
}
// --- Helper function to clear all types of map markers ---
function clearAllMapMarkers() {
  if (userMarker) userMarker.setMap(null);
  if (correctLocationMarker) correctLocationMarker.setMap(null);
  if (mapOverlayMarker) mapOverlayMarker.setMap(null); // For quiz MCQ markers
  studyModeMarkers.forEach((marker) => marker.setMap(null)); // For study mode markers
  userMarker = null;
  correctLocationMarker = null;
  mapOverlayMarker = null;
  studyModeMarkers = [];
  if (infoWindow) infoWindow.close(); // Close any open info windows
}

// --- New Helper Function: getCurrentMapStyle() ---
function getCurrentMapStyle() {
  if (useColorfulMap) {
    return colorfulMapConfig; // Results in default Google Maps colorful style
  } else {
    if (showStateBoundaries) {
      console.log("Applying examStyleMapConfig (with state boundaries)");
      return examStyleMapConfig;
    } else {
      console.log(
        "Applying examStyleMapNoStateBoundariesConfig (NO state boundaries)"
      );

      return examStyleMapNoStateBoundariesConfig;
    }
  }
}

// --- New Helper Function: applyMapStyle() ---
function applyMapStyle() {
  if (map) {
    // Ensure map object exists
    const newStyle = getCurrentMapStyle();
    map.setOptions({ styles: newStyle });
    console.log(
      "Map style applied:",
      newStyle ? "Custom Style" : "Default Google Style"
    );
  }
}

function getCurrentMapIdToUse() {
  if (useColorfulMap) {
    console.log("Using Map ID: COLORFUL");
    return MAP_ID_COLORFUL;
  } else {
    if (showStateBoundaries) {
      console.log("Using Map ID: EXAM_WITH_STATES");
      return MAP_ID_EXAM_WITH_STATES;
    } else {
      console.log("Using Map ID: EXAM_NO_STATES");
      return MAP_ID_EXAM_NO_STATES;
    }
  }
}

function createMap() {
  const mapOptions = {
    center: { lat: 22.5937, lng: 78.9629 },
    zoom: 5,
    minZoom: 4,
    maxZoom: 8,
    restriction: {
      latLngBounds: { north: 37.0, south: 7.0, west: 67.0, east: 98.0 },
      strictBounds: false,
    },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    mapId: getCurrentMapIdToUse(), // Set the Map ID
    // NO 'styles' property here
  };

  // If map already exists, we need to handle its destruction and listeners carefully
  // For simplicity in this step, we assume 'map' div is always available.
  // A more robust way would be to remove the old map instance if it exists.
  if (map) {
    // Basic clear out - more robust might involve removing all listeners from old map
    // For now, we are just creating a new map instance in the same div.
    // This might lead to issues if not handled carefully, especially with event listeners.
    console.log("Re-creating map instance.");
  }

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Re-attach map-specific event listeners IF NECESSARY.
  // The primary map click listener for placing user markers during quiz:
  map.addListener("click", handleMapClick); // Re-add after map creation

  // If a quiz or study mode was active, you'd need to re-render markers:
  if (quizContentAreaEl.classList.contains("active-view") && currentQuestion) {
    // Re-render current question's MCQ marker if applicable
    conditionallyRenderMcqMarkerForCurrentQuestion();
    // User marker and correct location marker are typically placed on interaction
  } else if (
    studyModeContentEl.classList.contains("active-view") &&
    currentStudyingSectionItems.length > 0
  ) {
    // Re-render all study mode markers (this will call clearAllMapMarkers first)
    showAllAnswersForSection(
      currentStudyingSectionName,
      currentStudyingSectionItems,
      false
    ); // false to prevent sidebar collapse
  }

  console.log("Map created/re-created with Map ID:", map.getMapId());
}

// New helper function
function conditionallyRenderMcqMarkerForCurrentQuestion() {
  if (mapOverlayMarker) mapOverlayMarker.map = null; // Clear previous if any
  mapOverlayMarker = null;

  if (
    currentQuestion &&
    currentQuestion.type === "identify_region_mcq" &&
    currentQuestion.mapMarkerInfo &&
    currentQuestion.mapMarkerInfo.label &&
    typeof currentQuestion.mapMarkerInfo.lat === "number" &&
    typeof currentQuestion.mapMarkerInfo.lng === "number"
  ) {
    const regionMarkerLabelElement = document.createElement("div");
    // ... (style regionMarkerLabelElement as before) ...
    regionMarkerLabelElement.textContent = currentQuestion.mapMarkerInfo.label;
    regionMarkerLabelElement.style.padding = "5px 8px";
    regionMarkerLabelElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    regionMarkerLabelElement.style.color = "white";
    regionMarkerLabelElement.style.borderRadius = "50%";
    regionMarkerLabelElement.style.fontSize = "16px";
    regionMarkerLabelElement.style.fontWeight = "bold";
    regionMarkerLabelElement.style.textAlign = "center";
    // ... more styles ...

    mapOverlayMarker = new google.maps.marker.AdvancedMarkerElement({
      position: {
        lat: currentQuestion.mapMarkerInfo.lat,
        lng: currentQuestion.mapMarkerInfo.lng,
      },
      map: map,
      content: regionMarkerLabelElement,
      title: `Region ${currentQuestion.mapMarkerInfo.label}: ${
        currentQuestion.targetAreaDescription || currentQuestion.name
      }`,
    });
  }
}

// Call setupSidebarToggles() in initApp()
// initApp() {
//    ...
//    setupGlobalEventListeners();
//    setupSettingsListeners();
//    setupSidebarToggles(); // Add this call
//    ...
// }

// Ensure initApp is called by Google Maps API
// (callback=initApp in the script URL)
