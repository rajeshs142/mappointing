// locations.js

const allMapItems = [
    // =========================================================================
    // A. HISTORY (Chapter 2: Nationalism in India)
    // =========================================================================

    // A.1 Indian National Congress Sessions
    {
        id: "hist_inc_calcutta_1920",
        name: "Calcutta (Sept 1920)",
        category: "History",
        subCategory: "Indian National Congress Sessions",
        lat: 22.5726,
        lng: 88.3639,
        type: "point",
        questionText: "Locate the Indian National Congress Session held in Calcutta (September 1920).",
        significance: "Special session for Non-Cooperation approval.",
        hint: "Major city in West Bengal."
    },
    {
        id: "hist_inc_nagpur_1920",
        name: "Nagpur (Dec 1920)",
        category: "History",
        subCategory: "Indian National Congress Sessions",
        lat: 21.1458,
        lng: 79.0882,
        type: "point",
        questionText: "Locate the Indian National Congress Session held in Nagpur (December 1920).",
        significance: "Regular session where the Non-Cooperation program was adopted.",
        hint: "Major city in Maharashtra."
    },
    {
        id: "hist_inc_madras_1927",
        name: "Madras (1927)",
        category: "History",
        subCategory: "Indian National Congress Sessions",
        lat: 13.0827,
        lng: 80.2707,
        type: "point",
        questionText: "Locate the Indian National Congress Session held in Madras (1927).",
        significance: "Resolution against Simon Commission, call for 'Poorna Swaraj' discussed.",
        hint: "Now Chennai, a major port city in Tamil Nadu."
    },

    // A.2 Important Centres of Indian National Movement
    {
        id: "hist_nm_champaran",
        name: "Champaran (Bihar)",
        category: "History",
        subCategory: "Important Centres of National Movement",
        lat: 26.6911,
        lng: 84.6097, // Approx center of Champaran district
        type: "point",
        questionText: "Locate Champaran (Bihar), known for the Movement of Indigo Planters.",
        significance: "Gandhiji led the Satyagraha for indigo planters against oppressive cultivation terms.",
        hint: "A district in Bihar."
    },
    {
        id: "hist_nm_kheda",
        name: "Kheda (Gujarat)",
        category: "History",
        subCategory: "Important Centres of National Movement",
        lat: 22.7512,
        lng: 72.6882, // Approx center of Kheda district
        type: "point",
        questionText: "Locate Kheda (Gujarat), site of the Peasant Satyagraha.",
        significance: "Peasants sought revenue relaxation due to crop failure; Gandhiji supported their cause.",
        hint: "A district in Gujarat."
    },
    {
        id: "hist_nm_ahmedabad",
        name: "Ahmedabad (Gujarat)",
        category: "History",
        subCategory: "Important Centres of National Movement",
        lat: 23.0225,
        lng: 72.5714,
        type: "point",
        questionText: "Locate Ahmedabad (Gujarat), where Cotton Mill Workers Satyagraha took place.",
        significance: "Gandhiji led a strike for better wages for cotton mill workers.",
        hint: "Major industrial city in Gujarat."
    },
    {
        id: "hist_nm_amritsar",
        name: "Amritsar (Punjab)",
        category: "History",
        subCategory: "Important Centres of National Movement",
        lat: 31.6340,
        lng: 74.8723,
        type: "point",
        questionText: "Locate Amritsar (Punjab), site of the Jallianwala Bagh Incident.",
        significance: "Site of the tragic Jallianwala Bagh massacre in 1919.",
        hint: "Holy city for Sikhs in Punjab."
    },
    {
        id: "hist_nm_chauri_chaura",
        name: "Chauri Chaura (U.P.)",
        category: "History",
        subCategory: "Important Centres of National Movement",
        lat: 26.6490,
        lng: 83.5822, // Approx location of Chauri Chaura town
        type: "point",
        questionText: "Locate Chauri Chaura (U.P.), associated with calling off the Non-Cooperation Movement.",
        significance: "Violence here led Gandhiji to call off the Non-Cooperation Movement in 1922.",
        hint: "A town in Gorakhpur district, Uttar Pradesh."
    },
    {
        id: "hist_nm_dandi",
        name: "Dandi (Gujarat)",
        category: "History",
        subCategory: "Important Centres of National Movement",
        lat: 20.9300,
        lng: 72.8700,
        type: "point",
        questionText: "Locate Dandi (Gujarat), known for the Salt March.",
        significance: "Endpoint of the Salt March; Gandhiji broke the salt law here, starting Civil Disobedience.",
        hint: "Coastal village in Gujarat."
    },

    // =========================================================================
    // B. GEOGRAPHY
    // =========================================================================

    // B.1 Chapter 1: Resources and Development (Identification only - Major Soil Types)
    {
        id: "geo_soil_alluvial",
        name: "Alluvial Soil",
        category: "Geography",
        subCategory: "Major Soil Types",
        type: "identify_region_mcq",
        questionText: "The region marked 'A' is predominantly known for which major soil type?",
        mapMarkerInfo: { label: "A", lat: 27.9704, lng: 79.0190, targetAreaDescription: "Northern Plains (e.g., Uttar Pradesh, Punjab)" },
        mcqOptions: ["Alluvial Soil", "Black Soil", "Laterite Soil", "Arid Soil"],
        correctOption: "Alluvial Soil",
        significance: "Highly fertile soil found in river valleys and deltas, crucial for agriculture in the Indo-Gangetic plains.",
        hint: "Found extensively in the Northern Plains of India."
    },
    {
        id: "geo_soil_black",
        name: "Black Soil",
        category: "Geography",
        subCategory: "Major Soil Types",
        type: "identify_region_mcq",
        questionText: "The region marked 'B' is predominantly known for which major soil type?",
        mapMarkerInfo: { label: "B", lat: 20.2500, lng: 75.9000, targetAreaDescription: "Deccan Plateau (e.g., Maharashtra, parts of Gujarat, MP)" },
        mcqOptions: ["Red and Yellow Soil", "Black Soil", "Forest Soil", "Laterite Soil"],
        correctOption: "Black Soil",
        significance: "Also known as Regur soil, ideal for cotton cultivation, found in the Deccan Trap region.",
        hint: "Common in the Deccan Plateau, good for cotton."
    },
    {
        id: "geo_soil_red_yellow",
        name: "Red and Yellow Soil",
        category: "Geography",
        subCategory: "Major Soil Types",
        type: "identify_region_mcq",
        questionText: "The region marked 'C' is predominantly known for which major soil type?",
        mapMarkerInfo: { label: "C", lat: 15.0000, lng: 79.5000, targetAreaDescription: "Eastern and Southern parts of Deccan Plateau (e.g., Odisha, Chhattisgarh, parts of Southern states)" },
        mcqOptions: ["Alluvial Soil", "Black Soil", "Red and Yellow Soil", "Arid Soil"],
        correctOption: "Red and Yellow Soil",
        significance: "Develops on crystalline igneous rocks in areas of low rainfall, less fertile than alluvial or black soils.",
        hint: "Found in areas of lower rainfall on the Deccan Plateau and parts of eastern India."
    },
    {
        id: "geo_soil_laterite",
        name: "Laterite Soil",
        category: "Geography",
        subCategory: "Major Soil Types",
        type: "identify_region_mcq",
        questionText: "The region marked 'D' is predominantly known for which major soil type?",
        mapMarkerInfo: { label: "D", lat: 13.0000, lng: 75.5000, targetAreaDescription: "Areas with high temperature and heavy rainfall (e.g., Western Ghats, parts of NE India, Odisha)" },
        mcqOptions: ["Arid Soil", "Laterite Soil", "Forest Soil", "Black Soil"],
        correctOption: "Laterite Soil",
        significance: "Develops in areas with high temperature and heavy rainfall, suitable for tea and coffee with manuring.",
        hint: "Found in regions with alternating wet and dry seasons, like parts of Western Ghats."
    },
    {
        id: "geo_soil_arid",
        name: "Arid Soil",
        category: "Geography",
        subCategory: "Major Soil Types",
        type: "identify_region_mcq",
        questionText: "The region marked 'E' is predominantly known for which major soil type?",
        mapMarkerInfo: { label: "E", lat: 26.5000, lng: 72.0000, targetAreaDescription: "Western Rajasthan and parts of Gujarat" },
        mcqOptions: ["Alluvial Soil", "Black Soil", "Laterite Soil", "Arid Soil"],
        correctOption: "Arid Soil",
        significance: "Sandy in texture and saline in nature, found in dry climates with low rainfall.",
        hint: "Predominantly found in the desert regions of Rajasthan."
    },
    {
        id: "geo_soil_forest_mountainous",
        name: "Forest and Mountainous Soil",
        category: "Geography",
        subCategory: "Major Soil Types",
        type: "identify_region_mcq",
        questionText: "The region marked 'F' is predominantly known for which major soil type?",
        mapMarkerInfo: { label: "F", lat: 32.0000, lng: 77.5000, targetAreaDescription: "Himalayan region and other mountainous areas" },
        mcqOptions: ["Black Soil", "Forest and Mountainous Soil", "Arid Soil", "Laterite Soil"],
        correctOption: "Forest and Mountainous Soil",
        significance: "Found in hilly and mountainous areas with sufficient rainfall, varies in texture and fertility.",
        hint: "Associated with the Himalayan region and other high altitude areas."
    },

    // B.3 Chapter 3: Water Resources (Locating and Labelling only - Dams)
    {
        id: "geo_dam_salal",
        name: "Salal Dam",
        category: "Geography",
        subCategory: "Dams",
        lat: 33.1480,
        lng: 74.8120,
        type: "point",
        questionText: "Locate the Salal Dam.",
        significance: "Hydroelectric project on the Chenab river in J&K/Ladakh UT.",
        hint: "On Chenab river, J&K/Ladakh."
    },
    {
        id: "geo_dam_bhakra_nangal",
        name: "Bhakra Nangal Dam",
        category: "Geography",
        subCategory: "Dams",
        lat: 31.4158,
        lng: 76.4437, // Bhakra Dam actual location
        type: "point",
        questionText: "Locate the Bhakra Nangal Dam.",
        significance: "Major multipurpose project on the Sutlej river, Punjab/Himachal Pradesh border.",
        hint: "On Sutlej river, Punjab/HP border."
    },
    {
        id: "geo_dam_tehri",
        name: "Tehri Dam",
        category: "Geography",
        subCategory: "Dams",
        lat: 30.3776,
        lng: 78.4820,
        type: "point",
        questionText: "Locate the Tehri Dam.",
        significance: "One of the tallest dams in the world, on the Bhagirathi river in Uttarakhand.",
        hint: "On Bhagirathi river, Uttarakhand."
    },
    {
        id: "geo_dam_rana_pratap_sagar",
        name: "Rana Pratap Sagar Dam",
        category: "Geography",
        subCategory: "Dams",
        lat: 24.9145,
        lng: 75.5940,
        type: "point",
        questionText: "Locate the Rana Pratap Sagar Dam.",
        significance: "Gravity masonry dam on the Chambal river in Rajasthan.",
        hint: "On Chambal river, Rajasthan."
    },
    {
        id: "geo_dam_sardar_sarovar",
        name: "Sardar Sarovar Dam",
        category: "Geography",
        subCategory: "Dams",
        lat: 21.8303,
        lng: 73.7254,
        type: "point",
        questionText: "Locate the Sardar Sarovar Dam.",
        significance: "Large gravity dam on the Narmada river in Gujarat.",
        hint: "On Narmada river, Gujarat."
    },
    {
        id: "geo_dam_hirakud",
        name: "Hirakud Dam",
        category: "Geography",
        subCategory: "Dams",
        lat: 21.5696,
        lng: 83.8630,
        type: "point",
        questionText: "Locate the Hirakud Dam.",
        significance: "One of the longest dams in the world, on the Mahanadi river in Odisha.",
        hint: "On Mahanadi river, Odisha."
    },
    {
        id: "geo_dam_nagarjuna_sagar",
        name: "Nagarjuna Sagar Dam",
        category: "Geography",
        subCategory: "Dams",
        lat: 16.5755,
        lng: 79.3144,
        type: "point",
        questionText: "Locate the Nagarjuna Sagar Dam.",
        significance: "Masonry dam on the Krishna river, Telangana/Andhra Pradesh border.",
        hint: "On Krishna river, Telangana/AP border."
    },
    {
        id: "geo_dam_tungabhadra",
        name: "Tungabhadra Dam",
        category: "Geography",
        subCategory: "Dams",
        lat: 15.2500,
        lng: 76.3330,
        type: "point",
        questionText: "Locate the Tungabhadra Dam.",
        significance: "Multipurpose dam on the Tungabhadra river in Karnataka.",
        hint: "On Tungabhadra river, Karnataka."
    },

    // B.4 Chapter 4: Agriculture (Identification only)
    {
        id: "geo_agri_rice_area",
        name: "Major areas of Rice",
        category: "Geography",
        subCategory: "Agriculture - Major Crop Areas",
        type: "identify_region_mcq",
        questionText: "The region marked 'G' is a major cultivation area for which of these crops?",
        mapMarkerInfo: { label: "G", lat: 24.0000, lng: 88.5000, targetAreaDescription: "Eastern India, Coastal plains (e.g., West Bengal, Odisha, Andhra Pradesh)" },
        mcqOptions: ["Wheat", "Rice", "Cotton", "Jute"],
        correctOption: "Rice",
        significance: "Rice is a staple Kharif crop requiring high temperature, humidity, and rainfall.",
        hint: "Grown in areas with high rainfall or good irrigation, like eastern and southern coastal plains."
    },
    {
        id: "geo_agri_wheat_area",
        name: "Major areas of Wheat",
        category: "Geography",
        subCategory: "Agriculture - Major Crop Areas",
        type: "identify_region_mcq",
        questionText: "The region marked 'H' is a major cultivation area for which of these crops?",
        mapMarkerInfo: { label: "H", lat: 29.0000, lng: 77.0000, targetAreaDescription: "North and Northwestern India (e.g., Punjab, Haryana, Western UP)" },
        mcqOptions: ["Rice", "Wheat", "Sugarcane", "Tea"],
        correctOption: "Wheat",
        significance: "Wheat is a staple Rabi crop, requiring cool growing season and bright sunshine at ripening.",
        hint: "Primarily grown in the northern and north-western parts of the country."
    },
    // Largest/Major Producer States - Identification only
    {
        id: "geo_agri_sugarcane",
        name: "Sugarcane (Major Producer State)",
        category: "Geography",
        subCategory: "Agriculture - Major Producer States",
        type: "identify_region_mcq",
        questionText: "The region marked 'I' is a major producer of which crop?",
        mapMarkerInfo: { label: "I", lat: 27.5000, lng: 80.5000, targetAreaDescription: "Uttar Pradesh" },
        mcqOptions: ["Tea", "Coffee", "Sugarcane", "Rubber"],
        correctOption: "Sugarcane",
        significance: "A tropical/subtropical crop, main source of sugar, gur, khandsari and molasses.",
        hint: "Uttar Pradesh is a leading producer of this tall, sweet grass."
    },
    {
        id: "geo_agri_tea",
        name: "Tea (Major Producer State/Region)",
        category: "Geography",
        subCategory: "Agriculture - Major Producer States",
        type: "identify_region_mcq",
        questionText: "The region marked 'J' is a major producer of which beverage crop?",
        mapMarkerInfo: { label: "J", lat: 26.5000, lng: 93.0000, targetAreaDescription: "Assam / Darjeeling" },
        mcqOptions: ["Coffee", "Tea", "Rubber", "Cotton"],
        correctOption: "Tea",
        significance: "A beverage crop grown on plantations, requires well-drained soil and frequent showers.",
        hint: "Assam and Darjeeling are famous for this plantation crop."
    },
    {
        id: "geo_agri_coffee",
        name: "Coffee (Major Producer State/Region)",
        category: "Geography",
        subCategory: "Agriculture - Major Producer States",
        type: "identify_region_mcq",
        questionText: "The region marked 'K' is a major producer of which beverage crop?",
        mapMarkerInfo: { label: "K", lat: 13.0000, lng: 76.0000, targetAreaDescription: "Karnataka (Chikmagalur, Kodagu)" },
        mcqOptions: ["Tea", "Coffee", "Jute", "Sugarcane"],
        correctOption: "Coffee",
        significance: "Indian coffee (especially Arabica) is known for its quality; grown in Western Ghats.",
        hint: "Karnataka is a leading producer, known for its Arabica variety."
    },
    {
        id: "geo_agri_rubber",
        name: "Rubber (Major Producer State/Region)",
        category: "Geography",
        subCategory: "Agriculture - Major Producer States",
        type: "identify_region_mcq",
        questionText: "The region marked 'L' is a major producer of which plantation crop?",
        mapMarkerInfo: { label: "L", lat: 9.5000, lng: 76.8000, targetAreaDescription: "Kerala" },
        mcqOptions: ["Cotton", "Jute", "Rubber", "Tea"],
        correctOption: "Rubber",
        significance: "An equatorial crop, requires moist and humid climate with heavy rainfall.",
        hint: "Kerala is the leading producer of this elastic material."
    },
    {
        id: "geo_agri_cotton",
        name: "Cotton (Major Producer State/Region)",
        category: "Geography",
        subCategory: "Agriculture - Major Producer States",
        type: "identify_region_mcq",
        questionText: "The region marked 'M' is a major producer of which fibre crop?",
        mapMarkerInfo: { label: "M", lat: 21.5000, lng: 72.0000, targetAreaDescription: "Gujarat / Maharashtra (Deccan Plateau)" },
        mcqOptions: ["Jute", "Cotton", "Rubber", "Silk"],
        correctOption: "Cotton",
        significance: "A Kharif crop, requires high temperature, light rainfall, and black soil.",
        hint: "Grows well in black soil regions like Gujarat and Maharashtra."
    },
    {
        id: "geo_agri_jute",
        name: "Jute (Major Producer State/Region)",
        category: "Geography",
        subCategory: "Agriculture - Major Producer States",
        type: "identify_region_mcq",
        questionText: "The region marked 'N' is a major producer of which fibre crop?",
        mapMarkerInfo: { label: "N", lat: 24.0000, lng: 88.8000, targetAreaDescription: "West Bengal (Hooghly basin)" },
        mcqOptions: ["Cotton", "Jute", "Tea", "Rubber"],
        correctOption: "Jute",
        significance: "Known as the 'golden fibre', requires well-drained fertile soils and high temperature.",
        hint: "West Bengal is the leading producer, especially in the Hooghly basin."
    },

    // B.5 Chapter 5: Minerals and Energy Resources (Locating and Labelling only)
    // Iron Ore Mines
    {
        id: "geo_mine_iron_mayurbhanj",
        name: "Mayurbhanj (Iron Ore)",
        category: "Geography",
        subCategory: "Iron Ore Mines",
        lat: 21.9965,
        lng: 86.3781,
        type: "point",
        questionText: "Locate the Mayurbhanj iron ore mine.",
        significance: "Important iron ore mining region in Odisha.",
        hint: "Odisha."
    },
    {
        id: "geo_mine_iron_durg",
        name: "Durg (Iron Ore)",
        category: "Geography",
        subCategory: "Iron Ore Mines",
        lat: 20.9600, // Approx for Durg-Bastar-Chandrapur belt
        lng: 81.0000,
        type: "point",
        questionText: "Locate the Durg iron ore mining region.",
        significance: "Part of the Durg-Bastar-Chandrapur iron ore belt in Chhattisgarh.",
        hint: "Chhattisgarh."
    },
    {
        id: "geo_mine_iron_bailadila",
        name: "Bailadila (Iron Ore)",
        category: "Geography",
        subCategory: "Iron Ore Mines",
        lat: 18.7200,
        lng: 81.2200,
        type: "point",
        questionText: "Locate the Bailadila iron ore mines.",
        significance: "High-grade hematite iron ore found in Chhattisgarh, exported to Japan and South Korea.",
        hint: "Chhattisgarh, known for high-grade hematite."
    },
    {
        id: "geo_mine_iron_bellary",
        name: "Bellary (Iron Ore)",
        category: "Geography",
        subCategory: "Iron Ore Mines",
        lat: 15.1394,
        lng: 76.9214, // Part of Bellary-Chitradurga-Chikmagalur-Tumkur belt
        type: "point",
        questionText: "Locate the Bellary iron ore mining region.",
        significance: "Part of a major iron ore belt in Karnataka.",
        hint: "Karnataka."
    },
    {
        id: "geo_mine_iron_kudremukh",
        name: "Kudremukh (Iron Ore)",
        category: "Geography",
        subCategory: "Iron Ore Mines",
        lat: 13.2178,
        lng: 75.2719,
        type: "point",
        questionText: "Locate the Kudremukh iron ore mines.",
        significance: "Known for large deposits of iron ore in Karnataka, exported as slurry.",
        hint: "Karnataka, Western Ghats."
    },
    // Coal Mines
    {
        id: "geo_mine_coal_raniganj",
        name: "Raniganj (Coal)",
        category: "Geography",
        subCategory: "Coal Mines",
        lat: 23.6113,
        lng: 87.1288,
        type: "point",
        questionText: "Locate the Raniganj coalfield.",
        significance: "One of the oldest and largest coalfields in India, located in West Bengal.",
        hint: "West Bengal."
    },
    {
        id: "geo_mine_coal_bokaro",
        name: "Bokaro (Coal)",
        category: "Geography",
        subCategory: "Coal Mines",
        lat: 23.7789,
        lng: 85.8600,
        type: "point",
        questionText: "Locate the Bokaro coalfield.",
        significance: "Important coal mining and industrial center in Jharkhand.",
        hint: "Jharkhand."
    },
    {
        id: "geo_mine_coal_talcher",
        name: "Talcher (Coal)",
        category: "Geography",
        subCategory: "Coal Mines",
        lat: 20.9500,
        lng: 85.2167,
        type: "point",
        questionText: "Locate the Talcher coalfield.",
        significance: "Major coalfield in Odisha, known for its large reserves.",
        hint: "Odisha."
    },
    {
        id: "geo_mine_coal_neyveli",
        name: "Neyveli (Lignite Coal)",
        category: "Geography",
        subCategory: "Coal Mines",
        lat: 11.6100,
        lng: 79.4800,
        type: "point",
        questionText: "Locate the Neyveli lignite coal mines.",
        significance: "Known for large deposits of lignite (brown coal) in Tamil Nadu.",
        hint: "Tamil Nadu, known for lignite."
    },
    // Oil Fields
    {
        id: "geo_oil_digboi",
        name: "Digboi (Oil)",
        category: "Geography",
        subCategory: "Oil Fields",
        lat: 27.3833,
        lng: 95.6167,
        type: "point",
        questionText: "Locate the Digboi oil field.",
        significance: "Oldest oil-producing field in India, located in Assam.",
        hint: "Assam, oldest oil field."
    },
    {
        id: "geo_oil_naharkatiya",
        name: "Naharkatiya (Oil)",
        category: "Geography",
        subCategory: "Oil Fields",
        lat: 27.2833,
        lng: 95.3333,
        type: "point",
        questionText: "Locate the Naharkatiya oil field.",
        significance: "Important oil field in Assam, part of the Brahmaputra valley.",
        hint: "Assam."
    },
    {
        id: "geo_oil_mumbai_high",
        name: "Mumbai High (Oil)",
        category: "Geography",
        subCategory: "Oil Fields",
        lat: 19.3333, // Offshore
        lng: 71.3333, // Offshore
        type: "point",
        questionText: "Locate the Mumbai High offshore oil field.",
        significance: "Largest offshore oil field in India, located in the Arabian Sea.",
        hint: "Offshore, Arabian Sea, west of Mumbai."
    },
    {
        id: "geo_oil_bassien",
        name: "Bassien (Oil/Gas)", // Often referred to as Bassein
        category: "Geography",
        subCategory: "Oil Fields",
        lat: 19.8333, // Offshore, south of Mumbai High
        lng: 71.8333, // Offshore
        type: "point",
        questionText: "Locate the Bassien (Bassein) offshore oil/gas field.",
        significance: "Significant offshore oil and gas field south of Mumbai High.",
        hint: "Offshore, south of Mumbai High."
    },
    {
        id: "geo_oil_kalol",
        name: "Kalol (Oil)",
        category: "Geography",
        subCategory: "Oil Fields",
        lat: 23.2333,
        lng: 72.5000,
        type: "point",
        questionText: "Locate the Kalol oil field.",
        significance: "Onshore oil field in Gujarat.",
        hint: "Gujarat, onshore field."
    },
    {
        id: "geo_oil_ankaleshwar",
        name: "Ankaleshwar (Oil)", // Ankleshwar
        category: "Geography",
        subCategory: "Oil Fields",
        lat: 21.6167,
        lng: 73.0167,
        type: "point",
        questionText: "Locate the Ankaleshwar (Ankleshwar) oil field.",
        significance: "One of the major onshore oil fields in Gujarat.",
        hint: "Gujarat, onshore field."
    },
    // Power Plants - Thermal
    {
        id: "geo_power_thermal_namrup",
        name: "Namrup (Thermal)",
        category: "Geography",
        subCategory: "Thermal Power Plants",
        lat: 27.1833,
        lng: 95.3333,
        type: "point",
        questionText: "Locate the Namrup thermal power plant.",
        significance: "Gas-based thermal power station in Assam.",
        hint: "Assam, gas-based."
    },
    {
        id: "geo_power_thermal_singrauli",
        name: "Singrauli (Thermal)",
        category: "Geography",
        subCategory: "Thermal Power Plants",
        lat: 24.1983,
        lng: 82.6680,
        type: "point",
        questionText: "Locate the Singrauli super thermal power plant.",
        significance: "Major coal-based thermal power plant in Madhya Pradesh.",
        hint: "Madhya Pradesh, coal-based."
    },
    {
        id: "geo_power_thermal_ramagundam",
        name: "Ramagundam (Thermal)",
        category: "Geography",
        subCategory: "Thermal Power Plants",
        lat: 18.7600,
        lng: 79.4700,
        type: "point",
        questionText: "Locate the Ramagundam thermal power plant.",
        significance: "Super thermal power station in Telangana.",
        hint: "Telangana, coal-based."
    },
    // Power Plants - Nuclear
    {
        id: "geo_power_nuclear_narora",
        name: "Narora (Nuclear)",
        category: "Geography",
        subCategory: "Nuclear Power Plants",
        lat: 28.1589,
        lng: 78.4092,
        type: "point",
        questionText: "Locate the Narora nuclear power plant.",
        significance: "Nuclear power station in Uttar Pradesh.",
        hint: "Uttar Pradesh."
    },
    {
        id: "geo_power_nuclear_kakrapar", // Kakrapara
        name: "Kakrapara (Nuclear)",
        category: "Geography",
        subCategory: "Nuclear Power Plants",
        lat: 21.2358,
        lng: 73.3458,
        type: "point",
        questionText: "Locate the Kakrapara nuclear power plant.",
        significance: "Nuclear power station in Gujarat.",
        hint: "Gujarat."
    },
    {
        id: "geo_power_nuclear_tarapur",
        name: "Tarapur (Nuclear)",
        category: "Geography",
        subCategory: "Nuclear Power Plants",
        lat: 19.8289,
        lng: 72.6569,
        type: "point",
        questionText: "Locate the Tarapur nuclear power plant.",
        significance: "India's first commercial nuclear power station, located in Maharashtra.",
        hint: "Maharashtra, India's first."
    },
    {
        id: "geo_power_nuclear_kalpakkam",
        name: "Kalpakkam (Nuclear)",
        category: "Geography",
        subCategory: "Nuclear Power Plants",
        lat: 12.5619,
        lng: 80.1730,
        type: "point",
        questionText: "Locate the Kalpakkam nuclear power plant.",
        significance: "Nuclear power station (Madras Atomic Power Station) in Tamil Nadu.",
        hint: "Tamil Nadu."
    },

    // B.6 Chapter 6: Manufacturing Industries (Locating and Labelling only - Software Technology Parks)
    {
        id: "geo_stp_noida",
        name: "Noida STP",
        category: "Geography",
        subCategory: "Software Technology Parks",
        lat: 28.5355,
        lng: 77.3910,
        type: "point",
        questionText: "Locate the Software Technology Park in Noida.",
        significance: "Major IT hub in Uttar Pradesh, part of NCR.",
        hint: "Uttar Pradesh, near Delhi."
    },
    {
        id: "geo_stp_gandhinagar",
        name: "Gandhinagar STP",
        category: "Geography",
        subCategory: "Software Technology Parks",
        lat: 23.2156,
        lng: 72.6369,
        type: "point",
        questionText: "Locate the Software Technology Park in Gandhinagar.",
        significance: "IT park in the capital city of Gujarat.",
        hint: "Gujarat."
    },
    {
        id: "geo_stp_mumbai",
        name: "Mumbai STP",
        category: "Geography",
        subCategory: "Software Technology Parks",
        lat: 19.0760, // General Mumbai
        lng: 72.8777,
        type: "point",
        questionText: "Locate a Software Technology Park area in Mumbai.",
        significance: "Major IT and financial hub in Maharashtra.",
        hint: "Maharashtra."
    },
    {
        id: "geo_stp_pune",
        name: "Pune STP",
        category: "Geography",
        subCategory: "Software Technology Parks",
        lat: 18.5204,
        lng: 73.8567,
        type: "point",
        questionText: "Locate the Software Technology Park area in Pune.",
        significance: "Prominent IT and automotive hub in Maharashtra.",
        hint: "Maharashtra."
    },
    {
        id: "geo_stp_hyderabad",
        name: "Hyderabad STP",
        category: "Geography",
        subCategory: "Software Technology Parks",
        lat: 17.3850,
        lng: 78.4867,
        type: "point",
        questionText: "Locate the Software Technology Park area in Hyderabad.",
        significance: "Major IT hub (HITEC City) in Telangana.",
        hint: "Telangana."
    },
    {
        id: "geo_stp_bengaluru",
        name: "Bengaluru STP",
        category: "Geography",
        subCategory: "Software Technology Parks",
        lat: 12.9716,
        lng: 77.5946,
        type: "point",
        questionText: "Locate the Software Technology Park area in Bengaluru.",
        significance: "Known as the Silicon Valley of India, major IT hub in Karnataka.",
        hint: "Karnataka, Silicon Valley of India."
    },
    {
        id: "geo_stp_chennai",
        name: "Chennai STP",
        category: "Geography",
        subCategory: "Software Technology Parks",
        lat: 13.0827,
        lng: 80.2707,
        type: "point",
        questionText: "Locate the Software Technology Park area in Chennai.",
        significance: "Important IT and manufacturing hub in Tamil Nadu.",
        hint: "Tamil Nadu."
    },
    {
        id: "geo_stp_thiruvananthapuram",
        name: "Thiruvananthapuram STP",
        category: "Geography",
        subCategory: "Software Technology Parks",
        lat: 8.5241,
        lng: 76.9366, // Technopark area
        type: "point",
        questionText: "Locate the Software Technology Park in Thiruvananthapuram.",
        significance: "Technopark, a major IT hub in Kerala.",
        hint: "Kerala, Technopark."
    },

    // B.7 Chapter 7: Lifelines of National Economy (Locating and Labelling only)
    // Major Sea Ports
    {
        id: "geo_port_kandla",
        name: "Kandla Port",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 22.9983,
        lng: 70.1939,
        type: "point",
        questionText: "Locate the Kandla sea port.",
        significance: "A tidal port in Gujarat, major port on the west coast (Deendayal Port).",
        hint: "Gujarat, tidal port."
    },
    {
        id: "geo_port_mumbai_major", // Differentiating from STP Mumbai
        name: "Mumbai Major Port",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 18.9400, // Mumbai Port Trust area
        lng: 72.8300,
        type: "point",
        questionText: "Locate the Mumbai major sea port.",
        significance: "One of India's largest natural ports, handling significant cargo.",
        hint: "Maharashtra, natural harbour."
    },
    {
        id: "geo_port_jnpt",
        name: "Jawaharlal Nehru Port (JNPT)",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 18.9600, // Nhava Sheva
        lng: 72.9400,
        type: "point",
        questionText: "Locate the Jawaharlal Nehru Port (JNPT / Nhava Sheva).",
        significance: "Largest container port in India, located near Mumbai.",
        hint: "Maharashtra, largest container port, near Mumbai."
    },
    {
        id: "geo_port_marmagao",
        name: "Marmagao Port",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 15.4120,
        lng: 73.7900,
        type: "point",
        questionText: "Locate the Marmagao sea port.",
        significance: "Major iron ore exporting port in Goa.",
        hint: "Goa, iron ore export."
    },
    {
        id: "geo_port_new_mangalore",
        name: "New Mangalore Port",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 12.9200,
        lng: 74.8200,
        type: "point",
        questionText: "Locate the New Mangalore sea port.",
        significance: "Deep-water, all-weather port in Karnataka.",
        hint: "Karnataka."
    },
    {
        id: "geo_port_kochi",
        name: "Kochi (Cochin) Port",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 9.9600,
        lng: 76.2500,
        type: "point",
        questionText: "Locate the Kochi (Cochin) sea port.",
        significance: "Major port on the Arabian Sea in Kerala, located on Willingdon Island.",
        hint: "Kerala, Arabian Sea."
    },
    {
        id: "geo_port_tuticorin",
        name: "Tuticorin Port", // V. O. Chidambaranar Port
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 8.7642,
        lng: 78.1893,
        type: "point",
        questionText: "Locate the Tuticorin sea port.",
        significance: "Major port in Tamil Nadu on the southeastern coast.",
        hint: "Tamil Nadu, southeastern coast."
    },
    {
        id: "geo_port_chennai_major", // Differentiating from STP Chennai
        name: "Chennai Major Port",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 13.0900,
        lng: 80.2900,
        type: "point",
        questionText: "Locate the Chennai major sea port.",
        significance: "One of the oldest and largest ports on the east coast of India.",
        hint: "Tamil Nadu, east coast."
    },
    {
        id: "geo_port_visakhapatnam",
        name: "Visakhapatnam Port",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 17.6900,
        lng: 83.3000,
        type: "point",
        questionText: "Locate the Visakhapatnam sea port.",
        significance: "Deep landlocked and protected port in Andhra Pradesh.",
        hint: "Andhra Pradesh, landlocked port."
    },
    {
        id: "geo_port_paradip",
        name: "Paradip Port",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 20.2600,
        lng: 86.6700,
        type: "point",
        questionText: "Locate the Paradip sea port.",
        significance: "Deep-water port on the east coast in Odisha.",
        hint: "Odisha, east coast."
    },
    {
        id: "geo_port_haldia",
        name: "Haldia Port",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 22.0280,
        lng: 88.0600,
        type: "point",
        questionText: "Locate the Haldia sea port.",
        significance: "Riverine port, part of Kolkata Port Trust, in West Bengal.",
        hint: "West Bengal, riverine port complex."
    },
    {
        id: "geo_port_kolkata_riverine", // Differentiating from INC Session
        name: "Kolkata Riverine Port",
        category: "Geography",
        subCategory: "Major Sea Ports",
        lat: 22.5500, // Kolkata Port area
        lng: 88.3200,
        type: "point",
        questionText: "Locate the Kolkata riverine port.",
        significance: "India's only major riverine port, located on the Hooghly River.",
        hint: "West Bengal, on Hooghly river."
    },
    // International Airports
    {
        id: "geo_airport_amritsar_rajasansi",
        name: "Amritsar (Raja Sansi) Airport",
        category: "Geography",
        subCategory: "International Airports",
        lat: 31.7095,
        lng: 74.7973, // Sri Guru Ram Dass Jee Int'l Airport
        type: "point",
        questionText: "Locate the Amritsar (Raja Sansi - Sri Guru Ram Dass Jee) International Airport.",
        significance: "International airport serving Amritsar, Punjab.",
        hint: "Punjab."
    },
    {
        id: "geo_airport_delhi_igi",
        name: "Delhi (Indira Gandhi Intl.) Airport",
        category: "Geography",
        subCategory: "International Airports",
        lat: 28.5562,
        lng: 77.1000, // IGI Airport
        type: "point",
        questionText: "Locate the Delhi (Indira Gandhi International) Airport.",
        significance: "Busiest airport in India, serving the National Capital Region.",
        hint: "Delhi, busiest airport."
    },
    {
        id: "geo_airport_mumbai_csia",
        name: "Mumbai (Chhatrapati Shivaji Intl.) Airport",
        category: "Geography",
        subCategory: "International Airports",
        lat: 19.0896,
        lng: 72.8656, // Chhatrapati Shivaji Maharaj Int'l Airport
        type: "point",
        questionText: "Locate the Mumbai (Chhatrapati Shivaji Maharaj International) Airport.",
        significance: "Primary international airport serving Mumbai, Maharashtra.",
        hint: "Maharashtra."
    },
    {
        id: "geo_airport_chennai_meenambakkam",
        name: "Chennai (Meenambakkam) Airport",
        category: "Geography",
        subCategory: "International Airports",
        lat: 12.9941,
        lng: 80.1709, // Chennai International Airport
        type: "point",
        questionText: "Locate the Chennai (Meenambakkam - Chennai International) Airport.",
        significance: "International airport serving Chennai, Tamil Nadu.",
        hint: "Tamil Nadu."
    },
    {
        id: "geo_airport_kolkata_nscb",
        name: "Kolkata (Netaji Subhash Chandra Bose Intl.) Airport",
        category: "Geography",
        subCategory: "International Airports",
        lat: 22.6547,
        lng: 88.4467, // Netaji Subhash Chandra Bose Int'l Airport
        type: "point",
        questionText: "Locate the Kolkata (Netaji Subhash Chandra Bose International) Airport.",
        significance: "International airport serving Kolkata, West Bengal.",
        hint: "West Bengal."
    },
    {
        id: "geo_airport_hyderabad_rgia",
        name: "Hyderabad (Rajiv Gandhi Intl.) Airport",
        category: "Geography",
        subCategory: "International Airports",
        lat: 17.2313,
        lng: 78.4298, // Rajiv Gandhi International Airport
        type: "point",
        questionText: "Locate the Hyderabad (Rajiv Gandhi International) Airport.",
        significance: "International airport serving Hyderabad, Telangana.",
        hint: "Telangana."
    }
];