import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const navItems = [
  ["▦", "Dashboard"],
  ["▱", "Marketplace"],
  ["◇", "Luxury"],
  ["🚘", "Transportation"],
  ["✦", "Gold"],
  ["◷", "Watches"],
  ["⌂", "Property"],
  ["▣", "Electronics"],
  ["◈", "Advanced Electronics", "NEW"],
  ["▤", "Fashion"],
  ["▧", "Digital Goods"],
  ["📈", "Investasi Global", "NEW"],
  ["₿", "Swap Service", "SWAP"],
  ["🏡", "Rumah ASEAN", "HOT"],
  ["🌍", "Global Housing", "LIVE"],
  ["✈", "Flight Tickets", "GLOBAL"],
  ["🛡", "Asuransi Masa Tua", "NEW"],
  ["🌏", "ASEAN Insurance", "FULL"],
];

const categories = [
  "Luxury",
  "Transportation",
  "Electronics",
  "Advanced Electronics",
  "Property",
  "Gold",
  "Watches",
  "Fashion",
  "Digital Goods",
  "Investasi Global",
  "Swap Service",
  "Rumah ASEAN",
  "Global Housing",
  "Flight Tickets",
  "Asuransi Masa Tua",
  "ASEAN Insurance",
];

const productSeed = [
  ["Pi to BTC Instant Swap Service", "Rate layanan: 250000 PI ≈ 1 BTC", "5 PI", "Swap Service", "Live swap", "4.9", "1840", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1200&auto=format&fit=crop"],
  ["BTC Savings Vault Service", "Layanan konversi Pi ke portofolio BTC", "10 PI", "Swap Service", "BTC ready", "4.8", "926", "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop"],
  ["Pi Crypto Exchange Pro", "Swap Pi ke BTC dan USDT premium", "15 PI", "Swap Service", "Exchange utility", "4.9", "1211", "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1200&auto=format&fit=crop"],
  ["Xiaomi 14 Ultra", "Flagship Leica Camera", "42 PI", "Electronics", "19 in stock", "4.9", "388", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"],
  ["Redmi Note 13 Pro+", "Best Seller Android", "18 PI", "Electronics", "42 in stock", "4.8", "1204", "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop"],
  ["iPhone 16 Pro Max", "Apple AI Flagship", "82 PI", "Advanced Electronics", "11 in stock", "5.0", "1822", "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop"],
  ["iPhone 16", "Next Generation Apple", "66 PI", "Electronics", "18 in stock", "4.9", "1451", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"],
  ["iPhone 15", "Apple Best Seller", "58 PI", "Electronics", "17 in stock", "4.9", "844", "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop"],
  ["iPhone 15 Pro Max", "1TB Titanium", "75 PI", "Electronics", "7 in stock", "4.9", "997", "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop"],
  ["MacBook Air M3", "Ultra Thin Apple Laptop", "39 PI", "Advanced Electronics", "15 in stock", "4.9", "1188", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop"],
  ["MacBook Pro M3 Max", "16 inch Space Black", "42 PI", "Advanced Electronics", "4 in stock", "4.9", "64", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop"],
  ["iMac M3", "Apple All-in-One Desktop", "55 PI", "Advanced Electronics", "9 in stock", "4.9", "611", "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop"],
  ["iPad Pro M4", "Apple OLED Tablet", "32 PI", "Advanced Electronics", "22 in stock", "4.9", "877", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop"],
  ["Apple Vision Pro", "Spatial Computing", "55 PI", "Advanced Electronics", "3 in stock", "4.8", "36", "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200&auto=format&fit=crop"],
  ["Apple Watch Ultra 2", "Adventure Smartwatch", "26 PI", "Advanced Electronics", "13 in stock", "4.9", "552", "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1200&auto=format&fit=crop"],
  ["AirPods Max", "Premium Apple Audio", "24 PI", "Electronics", "22 in stock", "4.8", "874", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"],
  ["AirPods Pro 2", "Apple Spatial Audio", "14 PI", "Electronics", "48 in stock", "4.8", "1932", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop"],
  ["Apple TV 4K", "Premium Streaming Device", "12 PI", "Electronics", "26 in stock", "4.7", "477", "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Galaxy S25 Ultra", "Galaxy AI Ultra", "85 PI", "Advanced Electronics", "10 in stock", "5.0", "1544", "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Galaxy S24 Ultra", "AI Smartphone", "68 PI", "Electronics", "9 in stock", "4.8", "666", "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Galaxy A55", "Popular Midrange Samsung", "24 PI", "Electronics", "35 in stock", "4.8", "642", "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Galaxy Z Fold 6", "Premium Foldable Phone", "78 PI", "Advanced Electronics", "8 in stock", "4.9", "214", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Galaxy Z Flip 6", "Premium Fold Phone", "58 PI", "Advanced Electronics", "14 in stock", "4.9", "966", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Galaxy Tab S9 Ultra", "AMOLED Android Tablet", "33 PI", "Advanced Electronics", "18 in stock", "4.8", "733", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Neo QLED 8K", "Premium Smart TV", "65 PI", "Advanced Electronics", "6 in stock", "4.9", "194", "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Odyssey OLED G9", "49 Inch Gaming Monitor", "48 PI", "Advanced Electronics", "7 in stock", "4.9", "288", "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Bespoke AI Refrigerator", "Smart AI Kitchen", "44 PI", "Advanced Electronics", "6 in stock", "4.8", "214", "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Galaxy Buds 3 Pro", "Premium Wireless Audio", "11 PI", "Electronics", "31 in stock", "4.8", "844", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Galaxy Watch 6 Classic", "Premium Smartwatch", "14 PI", "Electronics", "25 in stock", "4.8", "398", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung SmartThings Hub", "AI Smart Home Center", "9 PI", "Electronics", "37 in stock", "4.7", "298", "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop"],
  ["ASUS ROG Phone 8", "Gaming Smartphone", "39 PI", "Advanced Electronics", "14 in stock", "4.8", "312", "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=1200&auto=format&fit=crop"],
  ["Google Pixel 8 Pro", "AI Smartphone Experience", "44 PI", "Electronics", "13 in stock", "4.9", "418", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop"],
  ["OnePlus 12", "Fast Charging Beast", "33 PI", "Electronics", "21 in stock", "4.8", "466", "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=1200&auto=format&fit=crop"],
  ["OPPO Find X7 Ultra", "Luxury Camera Smartphone", "37 PI", "Electronics", "12 in stock", "4.9", "277", "https://images.unsplash.com/photo-1512054502232-10a0a035d672?q=80&w=1200&auto=format&fit=crop"],
  ["Vivo X100 Pro", "ZEISS Camera Phone", "35 PI", "Electronics", "16 in stock", "4.8", "298", "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1200&auto=format&fit=crop"],
  ["Infinix GT 20 Pro", "Affordable Gaming Phone", "14 PI", "Electronics", "49 in stock", "4.7", "733", "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop"],
  ["Toyota Avanza", "Family MPV Asia", "18 PI", "Transportation", "15 available", "4.8", "532", "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"],
  ["Honda Brio Satya", "Mobil Harian ASEAN", "14 PI", "Transportation", "23 available", "4.8", "642", "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop"],
  ["Perodua Myvi", "Mobil Favorit Malaysia", "13 PI", "Transportation", "18 available", "4.7", "511", "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop"],
  ["Toyota Vios", "Sedan ASEAN Premium", "19 PI", "Transportation", "10 available", "4.8", "301", "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"],
  ["Honda City RS", "Sedan Sport Asia", "20 PI", "Transportation", "9 available", "4.9", "267", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"],
  ["Suzuki XL7 Hybrid", "SUV Keluarga ASEAN", "21 PI", "Transportation", "14 available", "4.7", "244", "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop"],
  ["Mitsubishi Xpander", "Modern MPV", "24 PI", "Transportation", "18 available", "4.8", "298", "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200&auto=format&fit=crop"],
  ["Suzuki Ertiga Hybrid", "Efficient Family MPV", "20 PI", "Transportation", "14 available", "4.7", "251", "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop"],
  ["Toyota Alphard Executive Lounge", "Asian Luxury MPV", "72 PI", "Transportation", "4 available", "4.9", "118", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"],
  ["Lexus LM 500h", "VIP Hybrid Lounge", "98 PI", "Transportation", "2 available", "5.0", "74", "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"],
  ["Nissan GT-R R35", "Japan Performance Icon", "110 PI", "Transportation", "3 available", "5.0", "92", "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1200&auto=format&fit=crop"],
  ["Mercedes G-Class", "AMG G63 Black", "120 PI", "Luxury", "Limited", "5.0", "48", "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop"],
  ["BMW i8 Roadster", "Hybrid Supercar", "88 PI", "Luxury", "3 available", "4.9", "74", "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop"],
  ["Lamborghini Aventador", "SVJ Coupe", "150 PI", "Luxury", "Limited", "5.0", "39", "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop"],
  ["Ferrari SF90", "Stradale Hybrid", "135 PI", "Luxury", "2 available", "5.0", "33", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"],
  ["Ducati Panigale V4", "Superbike Edition", "38 PI", "Transportation", "6 available", "4.9", "59", "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop"],
  ["Kawasaki Ninja H2R", "Track Performance Bike", "58 PI", "Transportation", "2 available", "5.0", "31", "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1200&auto=format&fit=crop"],
  ["1KG Gold Bar 999.9", "Pure Gold Investment", "88 PI", "Gold", "12 in stock", "4.9", "128", "https://images.unsplash.com/photo-1610375461369-d613b5648cfe?q=80&w=1200&auto=format&fit=crop"],
  ["Rolex Submariner", "Date Black Edition", "65 PI", "Watches", "5 in stock", "4.9", "86", "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop"],
  ["Hublot Big Bang", "Black Magic Edition", "95 PI", "Watches", "2 in stock", "4.9", "27", "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop"],
  ["Louis Vuitton Bag", "Monogram Premium", "59 PI", "Fashion", "8 in stock", "4.8", "51", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop"],
  ["Diamond Necklace", "18K White Gold", "42 PI", "Luxury", "3 in stock", "4.9", "75", "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"],
  ["MacBook Pro M3 Max", "16 inch Space Black", "42 PI", "Advanced Electronics", "4 in stock", "4.9", "64", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop"],
  ["Apple Vision Pro", "Spatial Computing", "55 PI", "Advanced Electronics", "3 in stock", "4.8", "36", "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200&auto=format&fit=crop"],
  ["DJI Mavic 3 Pro", "Cine Premium Combo", "58 PI", "Advanced Electronics", "5 in stock", "4.9", "55", "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop"],
  ["PlayStation 5 Pro", "Gaming Console", "52 PI", "Advanced Electronics", "11 in stock", "4.9", "122", "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop"],
  ["Meta Quest 3", "Mixed Reality Headset", "36 PI", "Advanced Electronics", "18 in stock", "4.8", "441", "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Neo QLED 8K", "Premium Smart TV", "65 PI", "Advanced Electronics", "6 in stock", "4.9", "194", "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop"],
  ["LG OLED Evo C4", "Cinema Gaming Television", "58 PI", "Advanced Electronics", "9 in stock", "4.9", "256", "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=1200&auto=format&fit=crop"],
  ["Sony WH-1000XM5", "Noise Cancelling Headphones", "18 PI", "Electronics", "44 in stock", "4.9", "1288", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop"],
  ["AirPods Max", "Premium Apple Audio", "24 PI", "Electronics", "22 in stock", "4.8", "874", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"],
  ["Apple Watch Ultra 2", "Adventure Smartwatch", "26 PI", "Advanced Electronics", "13 in stock", "4.9", "552", "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1200&auto=format&fit=crop"],
  ["Samsung Galaxy Watch 6 Classic", "Premium Smartwatch", "14 PI", "Electronics", "25 in stock", "4.8", "398", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"],
  ["Razer Blade 18", "Ultimate Gaming Laptop", "74 PI", "Advanced Electronics", "5 in stock", "4.9", "188", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop"],
  ["Alienware Aurora R16", "AI Gaming Desktop", "82 PI", "Advanced Electronics", "4 in stock", "5.0", "143", "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop"],
  ["Tesla Optimus Home Assistant", "AI Smart Robot", "120 PI", "Advanced Electronics", "Pre-order", "5.0", "67", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop"],
  ["Roborock S8 Ultra", "AI Smart Cleaning Robot", "29 PI", "Advanced Electronics", "15 in stock", "4.8", "311", "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1200&auto=format&fit=crop"],
  ["Dyson Zone", "Smart Air Purifier Headphones", "33 PI", "Advanced Electronics", "7 in stock", "4.7", "129", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop"],
  ["Canon EOS R5 Mark II", "Professional AI Camera", "57 PI", "Advanced Electronics", "6 in stock", "4.9", "214", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop"],
  ["GoPro Hero 13 Black", "Extreme Action Camera", "19 PI", "Electronics", "27 in stock", "4.8", "622", "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=1200&auto=format&fit=crop"],
  ["Crypto Trading Bot AI", "Advanced Automation", "35 PI", "Digital Goods", "Digital license", "4.8", "91", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"],
  ["Pi NFT Premium Pass", "Exclusive Pioneer Access", "25 PI", "Digital Goods", "Unlimited", "4.7", "201", "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1200&auto=format&fit=crop"],
  ["Apple Inc Investment", "Global Tech Company Shares", "12 PI", "Investasi Global", "NASDAQ", "5.0", "1244", "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1200&auto=format&fit=crop"],
  ["Tesla Investment Fund", "EV Innovation Shares", "15 PI", "Investasi Global", "Global Access", "4.9", "932", "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200&auto=format&fit=crop"],
  ["NVIDIA AI Investment", "AI Chip Company Asset", "18 PI", "Investasi Global", "Realtime Market", "5.0", "845", "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"],
  ["Allianz LegacyPro Global", "Worldwide Retirement Insurance", "55 PI", "Asuransi Masa Tua", "Worldwide Coverage", "5.0", "412", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"],
  ["Asuransi Masa Tua Pioneer", "Retirement Protection Plan", "45 PI", "Asuransi Masa Tua", "Open enrollment", "4.9", "214", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"],
  ["Indonesia Health Protect", "Asuransi kesehatan Indonesia", "18 PI", "ASEAN Insurance", "Indonesia coverage", "4.9", "812", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"],
  ["Malaysia Medical Secure", "Perlindungan kesehatan Malaysia", "17 PI", "ASEAN Insurance", "Malaysia coverage", "4.8", "644", "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"],
  ["Singapore Premium Care", "Executive health insurance Singapore", "28 PI", "ASEAN Insurance", "Singapore coverage", "5.0", "522", "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop"],
  ["Thailand Family Health", "Asuransi keluarga Thailand", "16 PI", "ASEAN Insurance", "Thailand coverage", "4.8", "587", "https://images.unsplash.com/photo-1580281657527-47aaf97c8c7c?q=80&w=1200&auto=format&fit=crop"],
  ["Philippines LifeCare Plus", "Medical protection Philippines", "15 PI", "ASEAN Insurance", "Philippines coverage", "4.7", "481", "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=1200&auto=format&fit=crop"],
  ["Vietnam Global Health", "Asuransi kesehatan Vietnam", "14 PI", "ASEAN Insurance", "Vietnam coverage", "4.7", "433", "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"],
  ["Brunei Elite Medical", "Premium medical plan Brunei", "22 PI", "ASEAN Insurance", "Brunei coverage", "4.8", "214", "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop"],
  ["Cambodia Health Shield", "Asuransi medis Cambodia", "12 PI", "ASEAN Insurance", "Cambodia coverage", "4.6", "301", "https://images.unsplash.com/photo-1511174511562-5f97f4f4e0c8?q=80&w=1200&auto=format&fit=crop"],
  ["Laos Medical Access", "Healthcare protection Laos", "11 PI", "ASEAN Insurance", "Laos coverage", "4.6", "198", "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop"],
  ["Myanmar Family Protect", "Family insurance Myanmar", "10 PI", "ASEAN Insurance", "Myanmar coverage", "4.5", "176", "https://images.unsplash.com/photo-1576765607924-0281b733c3e6?q=80&w=1200&auto=format&fit=crop"],
  ["Timor-Leste Care Plan", "Health insurance Timor-Leste", "9 PI", "ASEAN Insurance", "Timor-Leste coverage", "4.5", "122", "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop"],
  ["Luxury Villa Bali", "Private Pool Villa", "140 PI", "Property", "1 available", "4.9", "41", "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop"],
  ["Dubai Penthouse", "Skyline Marina View", "165 PI", "Property", "2 available", "5.0", "29", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"],
  ["Rumah Modern Jakarta", "Cluster Elite Indonesia", "32 PI", "Rumah ASEAN", "Jakarta Selatan", "4.9", "284", "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop"],
  ["Kuala Lumpur Sky Residence", "Malaysia Premium Home", "36 PI", "Rumah ASEAN", "KL City", "4.8", "197", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"],
  ["Bangkok Riverside House", "Thailand Family Villa", "28 PI", "Rumah ASEAN", "Bangkok", "4.8", "221", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],
  ["Singapore Smart Home", "Luxury ASEAN Property", "58 PI", "Rumah ASEAN", "Marina Bay", "5.0", "148", "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop"],
  ["Mumbai Smart Residence", "India Urban Family House", "26 PI", "Global Housing", "Mumbai India", "4.8", "318", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"],
  ["Lagos Family Residence", "Nigeria Smart Housing", "22 PI", "Global Housing", "Lagos Nigeria", "4.7", "186", "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1200&auto=format&fit=crop"],
  ["Kathmandu Mountain Residence", "Nepal Modern Housing", "19 PI", "Global Housing", "Kathmandu Nepal", "4.6", "143", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"],
  ["Singapore Airlines First Class", "Luxury flight Singapore to London", "9 PI", "Flight Tickets", "Global route", "4.9", "4121", "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop"],
  ["Emirates Business Class", "Dubai international premium flight", "11 PI", "Flight Tickets", "Worldwide access", "5.0", "3888", "https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=1200&auto=format&fit=crop"],
  ["Qatar Airways Elite", "Doha to Paris executive seat", "10 PI", "Flight Tickets", "Premium cabin", "4.9", "2941", "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=1200&auto=format&fit=crop"],
  ["Garuda Indonesia Executive", "Jakarta international premium access", "7 PI", "Flight Tickets", "ASEAN route", "4.8", "1834", "https://images.unsplash.com/photo-1504198458649-3128b932f49b?q=80&w=1200&auto=format&fit=crop"],
  ["AirAsia Global Pass", "Affordable ASEAN travel ticket", "4 PI", "Flight Tickets", "Budget global", "4.7", "5144", "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop"],
  ["Lufthansa Global Business", "Germany worldwide business flight", "10 PI", "Flight Tickets", "Global airline", "4.9", "1904", "https://images.unsplash.com/photo-1529074963764-98f45c47344b?q=80&w=1200&auto=format&fit=crop"],
];

const products = productSeed.map((item, index) => ({
  name: item[0],
  subtitle: item[1],
  price: item[2],
  tag: item[3],
  stock: item[4],
  rating: item[5],
  reviews: item[6],
  image: item[7],
  orders: 120 + index * 17,
  likes: 900 + index * 31,
}));

const actions = [
  ["▦", "Claim", "Claim Pi rewards instantly"],
  ["⚡", "Pay Fast", "Fast marketplace payment"],
  ["₿", "Swap Service", "Jasa penukaran Pi ke BTC"],
  ["♛", "Rewards", "Earn Pi & unlock rewards"],
  ["👛", "Pi Wallet", "Access your Pi rewards"],
  ["🛡", "Asuransi", "Masa tua & protection plan"],
  ["🌏", "ASEAN Insurance", "Full ASEAN health coverage"],
  ["☰", "Transactions", "View claim activity"],
];

const liveNotifications = [
  "🇸🇬 Someone from Singapore purchased iPhone 16 Pro Max",
  "🇦🇪 New Pi reward claimed in Dubai",
  "🇯🇵 Tokyo user booked ANA First Class ticket",
  "🇮🇩 Pioneer from Jakarta purchased Toyota Alphard",
  "🇺🇸 New Pi to BTC swap service requested",
  "🇹🇭 Thailand user purchased Samsung S24 Ultra",
];

const marketTicker = [
  "BTC $104,220 ▲2.4%",
  "GOLD $2,430 ▲1.2%",
  "PI Utility Active ●",
  "ETH $3,820 ▲1.8%",
  "NASDAQ ▲0.84%",
];

const currencies = {
  ID: "IDR",
  US: "USD",
  JP: "JPY",
  SG: "SGD",
  MY: "MYR",
  TH: "THB",
  VN: "VND",
  PH: "PHP",
};

const translations = {
  en: { search: "Search luxury, cars, gold, gadgets and more...", products: "Products Available", analytics: "Live Updates" },
  id: { search: "Cari luxury, mobil, emas, gadget dan lainnya...", products: "Produk Tersedia", analytics: "Update Langsung" },
  fr: { search: "Rechercher luxe, voitures, or, gadgets et plus...", products: "Produits Disponibles", analytics: "Mises à jour en direct" },
  es: { search: "Buscar lujo, autos, oro, gadgets y más...", products: "Productos Disponibles", analytics: "Actualizaciones en vivo" },
  ar: { search: "ابحث عن المنتجات الفاخرة والسيارات والذهب والمزيد...", products: "المنتجات المتاحة", analytics: "تحديثات مباشرة" },
};

const trustStats = [
  ["🛡", "Secure & Trusted", "Blockchain secured transactions"],
  ["▥", "Realtime Data", "Live marketplace analytics"],
  ["◎", "Global Marketplace", "Used in 200+ countries"],
  ["👥", "Pioneer Community", "60M+ active Pioneers"],
  ["π", "Pi Utility Ready", "Built for real world utility"],
];

function Button({ children, variant = "primary", className = "", onClick }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold transition active:scale-95";
  const outline = "border border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-100 hover:border-[#f4af47]/70 hover:bg-fuchsia-500/20";
  const primary = "bg-[#f4af47] text-black hover:bg-yellow-300";
  return <button type="button" onClick={onClick} className={[base, variant === "outline" ? outline : primary, className].join(" ")}>{children}</button>;
}

function Card({ children, className = "", onClick }) {
  return <div onClick={onClick} className={["rounded-2xl border border-fuchsia-500/30 bg-[#080015]/90 shadow-[0_0_35px_rgba(147,51,234,0.18)] backdrop-blur-xl", className].join(" ")}>{children}</div>;
}

function IconBubble({ children, className = "" }) {
  return <div className={["flex items-center justify-center rounded-2xl border border-fuchsia-400/40 bg-fuchsia-500/20 text-[#f4af47] shadow-[0_0_28px_rgba(217,70,239,0.35)]", className].join(" ")}><span aria-hidden="true">{children}</span></div>;
}

function ProductCard({ product, onPay }) {
  return (
    <Card className="group overflow-hidden transition hover:-translate-y-1 hover:border-[#f4af47]/70 hover:shadow-[0_0_45px_rgba(244,175,71,0.18)]">
      <div className="relative h-44 overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080015] via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-[#f4af47]/50 bg-black/70 px-3 py-1 text-[11px] font-semibold text-[#f4af47]">{product.tag}</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-white">{product.name}</h3>
          <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-300">✔ VERIFIED</span>
        </div>
        <p className="mt-1 text-sm text-fuchsia-100/60">{product.subtitle}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-fuchsia-100/55">
          <span className="text-[#f4af47]">★ {product.rating}</span>
          <span>({product.reviews} reviews)</span>
          <span>•</span>
          <span>{product.stock}</span>
          <span>•</span>
          <span className="text-emerald-300">🛒 {product.orders.toLocaleString()} orders</span>
          <span>•</span>
          <span className="text-pink-300">❤ {product.likes.toLocaleString()} likes</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-2xl font-black text-[#f4af47]">{product.price}</p>
          <Button variant="outline" onClick={onPay} className="px-3 py-2 text-xs">π Pay With Pi</Button>
        </div>
      </div>
    </Card>
  );
}

function LoginModal({ showAccessScreen, loginSource, claimMode, onClose, onAccessScreen, onBack, accessCode, setAccessCode }) {
  const wordCount = accessCode.trim() ? accessCode.trim().split(/\s+/).filter(Boolean).length : 0;
  const swapMode = loginSource.includes("Swap") || loginSource.includes("BTC");
  const actionLabel = claimMode ? "🎁 Claim Pi Rewards" : swapMode ? "₿ Request Swap Service" : "π Pay With Pi";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl">
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.25 }} className={showAccessScreen ? "relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-fuchsia-500/45 bg-[#07000f] text-white shadow-[0_0_140px_rgba(217,70,239,0.65)]" : "relative w-full max-w-md overflow-hidden rounded-[2rem] border border-fuchsia-400/40 bg-[#080017] p-7 text-white shadow-[0_0_90px_rgba(217,70,239,0.45)]"}>
        {!showAccessScreen ? (
          <div>
            <button type="button" onClick={onClose} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-fuchsia-100/70 hover:bg-white/10 hover:text-white">×</button>
            <IconBubble className="mb-6 h-20 w-20 text-4xl font-black">π</IconBubble>
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#f4af47]">Pi Network Access</p>
            <h2 className="mt-3 text-3xl font-black">{claimMode ? "Claim access required" : swapMode ? "Swap service access" : "Payment access required"}</h2>
            <p className="mt-3 leading-7 text-fuchsia-100/60">Untuk mengakses <span className="font-semibold text-white">{loginSource}</span>, lanjutkan ke halaman akses aman terlebih dahulu.</p>
            <div className="mt-7 space-y-3">
              <button type="button" onClick={onAccessScreen} className="flex w-full items-center justify-between rounded-2xl border border-fuchsia-400/35 bg-fuchsia-500/15 px-5 py-4 text-left transition hover:border-[#f4af47]/70 hover:bg-fuchsia-500/25"><span><span className="block font-bold">{claimMode ? "Open Claim Center" : swapMode ? "Open Swap Service" : "Open Pi Payment"}</span><span className="text-sm text-fuchsia-100/55">Secure access screen</span></span><span className="text-2xl text-[#f4af47]">›</span></button>
              <button type="button" onClick={onClose} className="w-full rounded-2xl border border-white/10 bg-white px-5 py-4 font-bold text-black transition hover:bg-[#f4af47]">Continue</button>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden bg-[#07000f] text-white">
            <div className="pointer-events-none absolute left-[-140px] top-[-120px] h-80 w-80 rounded-full bg-fuchsia-600/25 blur-3xl" />
            <div className="pointer-events-none absolute right-[-120px] bottom-[-120px] h-80 w-80 rounded-full bg-[#f4af47]/15 blur-3xl" />
            <div className="relative border-b border-white/10 bg-black/20 px-7 py-6 backdrop-blur-xl">
              <div className="flex items-center justify-between"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#f4af47] bg-[#13051f] text-3xl font-black text-[#f4af47] shadow-[0_0_35px_rgba(244,175,71,0.35)]">π</div><div><p className="text-2xl font-black tracking-tight text-white">Pi Desktop</p><p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200/55">PICHAINMALL</p></div></div><button type="button" onClick={onBack} className="rounded-2xl border border-fuchsia-400/40 bg-fuchsia-500/10 px-5 py-3 font-bold text-fuchsia-100 shadow-[0_0_25px_rgba(217,70,239,0.25)] hover:bg-fuchsia-500/20">← Back</button></div>
              <div className="mt-6 flex items-center justify-between text-fuchsia-100/80"><span className="text-3xl">←</span><span className="text-3xl font-black tracking-tight text-white">250.28 <span className="text-[#f4af47]">π</span></span><span className="flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-200/50 bg-white/5 text-lg font-bold">?</span></div>
            </div>
            <div className="relative px-8 py-8">
              <h2 className="mx-auto max-w-2xl text-center text-4xl font-black leading-tight text-white">Secure Pi Access <br /> for <span className="text-[#f4af47]">{swapMode ? "Swap Service" : claimMode ? "Reward Claim" : "Pi Payment"}</span></h2>
              <div className="mx-auto my-6 flex max-w-md items-center justify-center gap-5"><div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#f4af47]" /><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f4af47]/60 bg-[#f4af47]/10 text-[#f4af47] shadow-[0_0_30px_rgba(244,175,71,0.25)]">🔒</div><div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#f4af47]" /></div>
              <div className="rounded-[1.7rem] border border-fuchsia-500/70 bg-[#0d071a] p-3 shadow-[0_0_55px_rgba(217,70,239,0.32)]"><textarea value={accessCode} onChange={(event) => setAccessCode(event.target.value)} placeholder="" className="h-64 w-full resize-none rounded-[1.3rem] border border-white/10 bg-[#0b0615] p-6 font-mono text-lg leading-8 text-white outline-none placeholder:text-fuchsia-100/35 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-500/20" /><div className="flex justify-end px-3 pb-1 text-sm text-fuchsia-100/45">{wordCount} words</div></div>
              <button type="button" onClick={onClose} className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl border border-fuchsia-400/50 bg-gradient-to-r from-[#6310a5] via-[#8b24d9] to-[#4b0c7a] px-5 py-5 text-lg font-black text-white shadow-[0_0_55px_rgba(217,70,239,0.42)] transition hover:scale-[1.01] active:scale-[0.99]">{actionLabel}</button>
              <button type="button" disabled className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-5 text-lg font-bold text-fuchsia-100/40">🖐 Biometric Not Available</button>
              <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/10 to-fuchsia-500/10 p-5 shadow-[0_0_35px_rgba(52,211,153,0.12)]"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-xl shadow-[0_0_20px_rgba(52,211,153,0.25)]">✓</div><div><p className="text-lg font-black text-emerald-300">Secure Pi Authentication Gateway</p><p className="mt-1 text-sm leading-6 text-fuchsia-100/65">Protected utility access for the PICHAINMALL ecosystem with encrypted marketplace verification and secure Pioneer authentication interface.</p></div></div></div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const [showLogin, setShowLogin] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showAccessScreen, setShowAccessScreen] = useState(false);
  const [claimMode, setClaimMode] = useState(false);
  const [loginSource, setLoginSource] = useState("Pi Wallet");
  const [accessCode, setAccessCode] = useState("");
  const [query, setQuery] = useState("");
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const chartBars = [46, 66, 62, 82, 70, 95, 28];
  const linePoints = [18, 30, 28, 48, 45, 58, 53, 62, 78];
  const t = translations[language] || translations.en;

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (translations[browserLang]) setLanguage(browserLang);
    const region = navigator.language.split("-")[1] || "US";
    if (currencies[region]) setCurrencyCode(currencies[region]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNotificationIndex((prev) => (prev + 1) % liveNotifications.length), 3500);
    return () => clearInterval(interval);
  }, []);

  const openLogin = (source, isClaim = false) => {
    setLoginSource(source);
    setClaimMode(isClaim);
    setShowAccessScreen(false);
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
    setShowAccessScreen(false);
    setClaimMode(false);
  };

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let result = products;
    if (activeMenu && activeMenu !== "Dashboard" && activeMenu !== "Marketplace") {
      const targetMenu = activeMenu.toLowerCase();
      result = result.filter((item) => `${item.name} ${item.subtitle} ${item.tag}`.toLowerCase().includes(targetMenu));
    }
    if (!normalized) return result;
    return result.filter((item) => `${item.name} ${item.subtitle} ${item.tag}`.toLowerCase().includes(normalized));
  }, [query, activeMenu]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#030008] text-white">
      <div className="pointer-events-none fixed inset-0 z-0"><div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(107,61,245,0.28),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(244,175,71,0.16),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(168,85,247,0.18),transparent_35%)]" /><div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:76px_76px]" /></div>
      <div className="relative z-10 flex min-h-screen gap-5 p-4">
        <aside className="hidden w-[300px] shrink-0 xl:block"><div className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col rounded-2xl border border-fuchsia-500/30 bg-[#070014]/90 p-4 shadow-[0_0_45px_rgba(147,51,234,0.18)] backdrop-blur-xl"><div className="mb-6 flex items-center gap-3 px-1"><IconBubble className="h-12 w-12 text-2xl font-black">π</IconBubble><div><p className="text-2xl font-black tracking-tight">PICHAIN<span className="text-[#f4af47]">MALL</span></p><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4af47]">Pi Network Ecosystem</p></div></div><nav className="space-y-1">{navItems.map(([icon, label, badge]) => <button key={label} type="button" onClick={() => { setActiveMenu(label); setQuery(label === "Dashboard" || label === "Marketplace" ? "" : label); }} className={activeMenu === label ? "flex w-full items-center gap-4 rounded-xl bg-fuchsia-500/25 px-4 py-3 text-left text-white shadow-[0_0_28px_rgba(217,70,239,0.30)]" : "flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-fuchsia-100/70 transition hover:bg-white/[0.04] hover:text-white"}><span className="w-6 text-center text-xl text-fuchsia-300">{icon}</span><span className="flex-1">{label}</span>{badge ? <span className="rounded-full bg-fuchsia-500/35 px-2 py-1 text-[10px] text-fuchsia-100">{badge}</span> : null}</button>)}</nav><div className="mt-auto"><button type="button" onClick={() => openLogin("Pi Network", true)} className="flex w-full items-center gap-3 rounded-2xl border border-fuchsia-500/30 bg-white/[0.04] p-4 text-left hover:bg-fuchsia-500/10"><IconBubble className="h-12 w-12 text-xl font-black">π</IconBubble><div className="flex-1"><p className="font-semibold">PI NETWORK</p><p className="text-sm text-emerald-300">● CONNECTED</p></div><span className="text-[#f4af47]">›</span></button></div></div></aside>
        <main className="min-w-0 flex-1">
          <div className="mb-4 overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-[#090012]/90 py-3 shadow-[0_0_30px_rgba(168,85,247,0.15)]"><motion.div animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }} className="flex min-w-max gap-12 px-6 text-sm font-semibold text-[#f4af47]">{marketTicker.concat(marketTicker).map((item, index) => <span key={index} className="whitespace-nowrap">{item}</span>)}</motion.div></div>
          <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-3 xl:hidden"><IconBubble className="h-11 w-11 text-xl font-black">π</IconBubble><p className="text-2xl font-black">PICHAIN<span className="text-[#f4af47]">MALL</span></p></div><div className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-2xl border border-fuchsia-500/25 bg-[#080015]/80 px-5 py-3 text-fuchsia-100/60 shadow-[0_0_35px_rgba(147,51,234,0.14)]"><span className="text-2xl text-fuchsia-300">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none placeholder:text-fuchsia-100/45" placeholder={t.search} /></div><div className="flex items-center gap-3"><div className="hidden rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300 lg:flex">🌍 Currency: {currencyCode}</div><button type="button" onClick={() => openLogin("Top Pi Balance", true)} className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-5 py-3 font-bold text-[#f4af47]">π&nbsp; 250.28 PI</button><button type="button" onClick={() => openLogin("Pioneer Account", true)} className="flex items-center gap-3 rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-2"><IconBubble className="h-9 w-9 text-lg font-black">π</IconBubble><span className="text-left text-sm"><span className="block font-semibold">Pioneer</span><span className="text-xs text-fuchsia-100/55">Level 35</span></span><span className="text-fuchsia-200/60">⌄</span></button></div></header>
          <section className="grid gap-4 lg:grid-cols-[1.05fr_1fr]"><Card className="p-7"><div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]"><div><div className="flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-fuchsia-200/70">Pi Airdrop Rewards<span className="inline-flex items-center gap-2 normal-case tracking-normal text-emerald-300"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,1)]" /> Live</span></div><div className="mt-4 bg-gradient-to-r from-[#fff0a8] via-[#f4af47] to-[#b56b18] bg-clip-text text-6xl font-black tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(244,175,71,0.45)]">250.28 PI</div><p className="mt-3 text-xl text-fuchsia-100/60">Estimated claim value ⓘ</p><div className="mt-6 flex flex-wrap gap-3"><span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f4af47] font-black text-black">π</span> PI NETWORK</span><span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">● CONNECTED</span></div></div><div className="flex flex-col justify-between"><div className="text-right"><p className="text-sm uppercase tracking-[0.18em] text-fuchsia-200/70">Airdrop Progress ⌁</p><p className="mt-3 text-4xl font-black text-emerald-300 drop-shadow-[0_0_16px_rgba(52,211,153,0.55)]">+18.45% Claimed ↗</p><p className="mt-2 text-fuchsia-100/55">≈ +194.45 PI Rewards</p></div><div className="mt-5 flex h-24 items-end gap-2">{linePoints.map((point, index) => <motion.div key={index} initial={{ height: 0 }} animate={{ height: `${point}%` }} transition={{ duration: 0.6, delay: index * 0.05 }} className="flex-1 rounded-t-full bg-gradient-to-t from-fuchsia-800 to-fuchsia-400 shadow-[0_0_18px_rgba(217,70,239,0.35)]" />)}</div></div></div></Card><Card className="p-7"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-bold uppercase tracking-[0.08em] text-fuchsia-300">Airdrop Claim Analytics</h2><p className="mt-1 text-sm text-fuchsia-100/55">● {t.analytics}</p></div><button type="button" className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-5 py-2 text-sm text-fuchsia-100">7 Days⌄</button></div><div className="relative h-56 overflow-hidden rounded-2xl bg-black/20 p-5"><div className="absolute inset-x-5 bottom-8 top-5 flex flex-col justify-between opacity-30">{[1000, 800, 600, 400, 200, 0].map((num) => <div key={num} className="border-t border-fuchsia-200/20 text-xs text-fuchsia-100/45">{num}</div>)}</div><div className="absolute bottom-9 left-12 right-5 flex h-40 items-end gap-8">{chartBars.map((height, index) => <motion.div key={index} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 0.8, delay: index * 0.08 }} className={index === 4 ? "w-8 rounded-t bg-gradient-to-t from-[#7c3f00] to-[#f4af47] shadow-[0_0_24px_rgba(217,70,239,0.38)]" : "w-8 rounded-t bg-gradient-to-t from-fuchsia-900 to-fuchsia-500 shadow-[0_0_24px_rgba(217,70,239,0.38)]"} />)}</div><div className="absolute right-7 top-20 rounded-xl border border-fuchsia-500/40 bg-[#12051f]/90 px-4 py-3 text-sm shadow-[0_0_25px_rgba(217,70,239,0.25)]"><p className="text-white">Today</p><p className="font-bold text-[#f4af47]">320.45 PI</p><p className="text-xs text-fuchsia-100/55">Claim activity</p></div></div></Card></section>
          <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">{actions.map(([icon, title, text]) => { const isClaimAction = title === "Claim" || title === "Pi Wallet" || title === "Asuransi" || title === "ASEAN Insurance"; const isPaymentAction = title === "Pay Fast" || title === "Swap Service"; return <Card key={title} onClick={() => (isClaimAction || isPaymentAction ? openLogin(title, isClaimAction) : undefined)} className="group cursor-pointer p-5 transition hover:-translate-y-1 hover:border-[#f4af47]/70"><div className="flex items-center gap-4"><IconBubble className="h-16 w-16 text-3xl">{icon}</IconBubble><div className="min-w-0 flex-1"><p className="font-bold">{title}</p><p className="mt-1 text-sm text-fuchsia-100/55">{text}</p></div><span className="text-2xl text-[#f4af47] transition group-hover:translate-x-1">›</span></div></Card>; })}</section>
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-fuchsia-500/30 bg-[#090012]/80 px-5 py-4 shadow-[0_0_25px_rgba(168,85,247,0.12)]"><div><p className="text-xs uppercase tracking-[0.18em] text-fuchsia-300">Realtime Notification</p><motion.p key={notificationIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-1 font-semibold text-white">{liveNotifications[notificationIndex]}</motion.p></div><div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">● LIVE</div></div>
          <section className="mt-7"><div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h2 className="text-2xl font-bold tracking-wide">🔥 {activeMenu === "Dashboard" ? "PI AIRDROP CENTER" : activeMenu.toUpperCase()}</h2><p className="mt-1 text-fuchsia-300">Official Pi Utility Reward Ecosystem • Global Pi Community Access • Marketplace Utility Experience ✨</p></div><Button variant="outline" className="rounded-full px-6 py-3">{filteredProducts.length} {t.products}</Button></div><div className="mb-5 flex flex-wrap gap-2">{categories.map((category) => <button key={category} type="button" onClick={() => { setActiveMenu("Marketplace"); setQuery(category); }} className="rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1.5 text-xs text-fuchsia-100/70 hover:border-[#f4af47]/60 hover:text-white">{category}</button>)}</div><div className="mb-6 overflow-hidden rounded-3xl border border-fuchsia-500/30 bg-[#090012]/70 p-5 shadow-[0_0_30px_rgba(168,85,247,0.15)]"><div className="mb-4 flex items-center justify-between"><div><h3 className="text-2xl font-black text-white">🔥 Trending Products</h3><p className="text-fuchsia-200/60">Most ordered & most liked global products</p></div><div className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-2 text-sm text-[#f4af47]">Live Trending</div></div><div className="flex gap-4 overflow-x-auto pb-2">{products.slice(0, 10).map((product, index) => <div key={product.name} className="min-w-[300px] rounded-2xl border border-fuchsia-500/25 bg-[#12051f]/70 p-4"><div className="flex items-center gap-3"><img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" /><div className="flex-1"><div className="flex items-center justify-between"><p className="font-bold text-white">#{index + 1} {product.name}</p><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">Trending</span></div><p className="mt-1 text-sm text-fuchsia-100/55">🛒 {product.orders.toLocaleString()} orders • ❤ {product.likes.toLocaleString()} likes</p><div className="mt-2 flex items-center gap-2"><span className="rounded-full border border-[#f4af47]/40 bg-[#f4af47]/10 px-2 py-1 text-[10px] text-[#f4af47]">✔ Verified Seller</span><span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2 py-1 text-[10px] text-cyan-300">⚡ Fast Delivery</span></div></div></div></div>)}</div></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">{filteredProducts.map((product, index) => <motion.div key={`${product.name}-${index}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}><ProductCard product={product} onPay={() => openLogin(`Pay With Pi - ${product.name}`, false)} /></motion.div>)}</div></section>
          <section className="mt-5 grid gap-4 rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 p-5 shadow-[0_0_45px_rgba(147,51,234,0.18)] md:grid-cols-5">{trustStats.map(([icon, title, text]) => <div key={title} className="flex items-center gap-4 border-fuchsia-300/20 md:border-r md:last:border-r-0"><IconBubble className="h-14 w-14 text-2xl">{icon}</IconBubble><div><p className="font-semibold">{title}</p><p className="text-sm text-fuchsia-100/55">{text}</p></div></div>)}</section>
        </main>
      </div>
      {showLogin ? <LoginModal showAccessScreen={showAccessScreen} loginSource={loginSource} claimMode={claimMode} onClose={closeLogin} onAccessScreen={() => setShowAccessScreen(true)} onBack={() => setShowAccessScreen(false)} accessCode={accessCode} setAccessCode={setAccessCode} /> : null}
    </div>
  );
}
