const pool = require('../config/db');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const CITIES = [
    { name: 'Kathmandu', slug: 'kathmandu' },
    { name: 'Lalitpur', slug: 'lalitpur' },
    { name: 'Bhaktapur', slug: 'bhaktapur' }
];

const CATEGORIES = [
    { name: 'Temple' },
    { name: 'Stupa' },
    { name: 'Durbar Square' },
    { name: 'Monastery' },
    { name: 'Museum' },
    { name: 'Market' },
    { name: 'Lake' }
];

const PLACES = [
    {
        name: 'Pashupatinath Temple',
        city: 'Kathmandu',
        category: 'Temple',
        description: 'Pashupatinath is the holiest Hindu temple in Nepal, dedicated to Lord Shiva. It sits on the banks of the sacred Bagmati River and is famous for its stunning pagoda architecture and the daily Aarti ceremony.',
        quote: 'The Lord of Animals protects all beings.',
        lat: 27.7104,
        lng: 85.3487,
        is_featured: true,
        image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?q=80&w=2070',
        beliefs: 'Devotees believe that dying at Pashupatinath or being cremated here ensures a direct path to liberation.',
        video: 'https://www.youtube.com/embed/P6M59w8T-5U'
    },
    {
        name: 'Swayambhunath Stupa',
        city: 'Kathmandu',
        category: 'Stupa',
        description: 'Resting on a hillock, Swayambhunath is one of the oldest religious sites in Nepal. The stupa’s painted eyes look out over the city, symbolizing the all-seeing wisdom of Buddha.',
        quote: 'The eyes of wisdom watch over the valley.',
        lat: 27.7149,
        lng: 85.2903,
        is_featured: true,
        image: 'https://images.unsplash.com/photo-1583096114844-065dc6dfa77d?q=80&w=2070',
        beliefs: 'Legend says the temple was built when the valley was formed from a giant lotus that bloomed in a primordial lake.',
        video: 'https://www.youtube.com/embed/zR7P2R-Fv3c'
    },
    {
        name: 'Boudhanath Stupa',
        city: 'Kathmandu',
        category: 'Stupa',
        description: 'One of the largest stupas in the world, Boudhanath is the heart of Tibetan Buddhism in Nepal. The massive white dome and golden spire are surrounded by monasteries and shops.',
        quote: 'Peace emanates from the mandala.',
        lat: 27.7215,
        lng: 85.3620,
        is_featured: true,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070',
        beliefs: 'Walking clockwise (Kora) around the stupa while spinning prayer wheels is believed to accumulate merit.',
        video: 'https://www.youtube.com/embed/n78Y9J-C0hU'
    },
    {
        name: 'Kathmandu Durbar Square',
        city: 'Kathmandu',
        category: 'Durbar Square',
        description: 'Once the seat of the Malla Kings, this square is a cluster of ancient palaces, courtyards, and temples. It is the spiritual and cultural heart of Old Kathmandu.',
        quote: 'History carved in stone and wood.',
        lat: 27.7042,
        lng: 85.3088,
        is_featured: false,
        image: 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2071',
        beliefs: 'It is the home of the Kumari Bahal, where the Living Goddess resides.',
        video: 'https://www.youtube.com/embed/ObeM134E9jA'
    },
    {
        name: 'Patan Durbar Square',
        city: 'Lalitpur',
        category: 'Durbar Square',
        description: 'Known for its Newar architecture, Patan is the "City of Fine Arts." The square features the Royal Palace and numerous intricate stone temples.',
        quote: 'The city of beauty shines eternal.',
        lat: 27.6727,
        lng: 85.3253,
        is_featured: true,
        image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
        beliefs: 'Locals believe Patan was built in the shape of the Buddhist Dharma Chakra.',
        video: 'https://www.youtube.com/embed/E_yR1-Fj0_0'
    },
    {
        name: 'Bhaktapur Durbar Square',
        city: 'Bhaktapur',
        category: 'Durbar Square',
        description: 'Bhaktapur is an open-air museum preserving medieval traditions. Its square is famous for the 55-Window Palace and the Golden Gate.',
        quote: 'Where tradition breathes.',
        lat: 27.6715,
        lng: 85.4293,
        is_featured: true,
        image: 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
        beliefs: 'The square is protected by goddess Durga, and the Malla kings were devotees of her power.',
        video: 'https://www.youtube.com/embed/pAnuA_f_Hks'
    },
    {
        name: 'Budhanilkantha Temple',
        city: 'Kathmandu',
        category: 'Temple',
        description: 'Home to a massive 5-meter stone statue of Lord Vishnu reclining on a bed of serpents in a cosmic pond. It is a masterpiece of Licchavi era stone carving.',
        quote: 'The Sleeping God of the Valley.',
        lat: 27.7831,
        lng: 85.3564,
        is_featured: true,
        image: 'https://images.unsplash.com/photo-1635338161569-80ac61521481?q=80&w=2070',
        beliefs: 'Local lore says the King of Nepal must never visit this site, or he will face a curse.',
        video: 'https://www.youtube.com/embed/HogX_V8vIoo'
    },
    {
        name: 'Nyatapola Temple',
        city: 'Bhaktapur',
        category: 'Temple',
        description: 'Standing at 30 meters, Nyatapola is the tallest temple in Nepal. It is dedicated to goddess Siddhi Lakshmi and is known for its incredible structural stability.',
        quote: 'A masterpiece of structural balance.',
        lat: 27.6713,
        lng: 85.4285,
        is_featured: true,
        image: 'https://images.unsplash.com/photo-1628172828308-14fc75e92973?q=80&w=2070',
        beliefs: 'The temple guards—wrestlers, elephants, lions, and griffins—possess ten times the strength of the level below them.',
        video: 'https://www.youtube.com/embed/3DCO9G9NqYo'
    },
    {
        name: 'Krishna Mandir',
        city: 'Lalitpur',
        category: 'Temple',
        description: 'A 17th-century stone temple in Patan Durbar Square, built in the Shikhara style. It is entirely made of stone and features carvings of the entire Mahabharata.',
        quote: 'The crowning jewel of Patan.',
        lat: 27.6725,
        lng: 85.3250,
        is_featured: true,
        image: 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
        beliefs: 'King Siddhi Narsingh Malla built it after Lord Krishna appeared to him in a dream.',
        video: 'https://www.youtube.com/embed/G6o-P2ndFIs'
    },
    {
        name: 'Dakshinkali Temple',
        city: 'Kathmandu',
        category: 'Temple',
        description: 'Located in a dark forest at the edge of the valley, this temple is dedicated to goddess Kali. It is a powerful center for Tantric rituals.',
        quote: 'Sacred energy in the southern hills.',
        lat: 27.5925,
        lng: 85.2678,
        is_featured: false,
        image: 'https://images.unsplash.com/photo-1604928148816-ce22201bc09b?q=80&w=2070',
        beliefs: 'Devotees sacrifice animals (roosters and goats) to appease the goddess and fulfill their wishes.',
        video: 'https://www.youtube.com/embed/f9vTjV_E6Yk'
    },
    {
        name: 'Kopan Monastery',
        city: 'Kathmandu',
        category: 'Monastery',
        description: 'A beautiful Gelugpa monastery on a hill north of Boudhanath. It is world-renowned for its meditation courses and study of Tibetan Buddhism.',
        quote: 'Peace for all beings.',
        lat: 27.7423,
        lng: 85.3639,
        is_featured: false,
        image: 'https://images.unsplash.com/photo-1614761001140-5b2067fc410b?q=80&w=2070',
        beliefs: 'A modern center of wisdom where thousands come to learn the path to enlightenment.',
        video: 'https://www.youtube.com/embed/F0f-l8K-8mI'
    },
    {
        name: 'Namobuddha',
        city: 'Bhaktapur',
        category: 'Monastery',
        description: 'One of the most sacred Buddhist pilgrimage sites. It is where Prince Mahasattva gave his body to a hungry tigress and her five cubs.',
        quote: 'The ultimate act of compassion.',
        lat: 27.5684,
        lng: 85.5862,
        is_featured: true,
        image: 'https://images.unsplash.com/photo-1633519842518-80ac135767b4?q=80&w=2070',
        beliefs: 'Buddhist tradition says that merit earned here is multiply many times over.',
        video: 'https://www.youtube.com/embed/fAiv7_6h6q4'
    },
    {
        name: 'Golden Temple',
        city: 'Lalitpur',
        category: 'Monastery',
        description: 'Hiranya Varna Mahavihar is a three-roofed Buddhist monastery with a gold-plated roof. It is a unique example of Newar Buddhist architecture.',
        quote: 'The Gilded Sanctuary.',
        lat: 27.6748,
        lng: 85.3245,
        is_featured: false,
        image: 'https://images.unsplash.com/photo-1634568019385-d72b252035d1?q=80&w=2070',
        beliefs: 'Non-celibate monks (Vajracharyas) maintain the daily rituals of the monastery.',
        video: 'https://www.youtube.com/embed/y2q_6u9S9u0'
    },
    {
        name: 'Changu Narayan',
        city: 'Bhaktapur',
        category: 'Temple',
        description: 'Often cited as the oldest temple in Nepal, Changu Narayan rests on a high ridge. It is dedicated to Vishnu and features ancient Licchavi era inscriptions.',
        quote: 'Standing since the 4th century.',
        lat: 27.7174,
        lng: 85.4278,
        is_featured: false,
        image: 'https://images.unsplash.com/photo-1624806992066-5ffcf9128f7a?q=80&w=2070',
        beliefs: 'Houses the earliest stone inscription in Nepal, documenting the reign of King Mana Deva.',
        video: 'https://www.youtube.com/embed/o9k3p_pWpC0'
    },
    {
        name: 'Bagh Bhairab Temple',
        city: 'Kathmandu',
        category: 'Temple',
        description: 'A historic temple in Kirtipur dedicated to Lord Bhairab in the form of a tiger (Bagh). It is a symbol of Kirtipur’s resistance.',
        quote: 'The Guardian of Kirtipur.',
        lat: 27.6792,
        lng: 85.2762,
        is_featured: false,
        image: 'https://images.unsplash.com/photo-1624807421841-86a07604b39b?q=80&w=2070',
        beliefs: 'The weapons on the top story belong to the Gorkhali troops who were defeated in their first attempt to conquer Kirtipur.',
        video: 'https://www.youtube.com/embed/qU-4K_mIdwY'
    },
    {
        name: 'Seto Machindranath',
        city: 'Kathmandu',
        category: 'Temple',
        description: 'A prominent temple in Janabahal, Kathmandu. The White Avalokiteshvara is worshipped by both Hindus and Buddhists.',
        quote: 'The White Avalokiteshvara.',
        lat: 27.7067,
        lng: 85.3117,
        is_featured: false,
        image: 'https://images.unsplash.com/photo-1628172960416-5b23d9a0d20d?q=80&w=2070',
        beliefs: 'The god of rain and protection, his chariot is paraded through the city every year.',
        video: 'https://www.youtube.com/embed/8-P_lPrn76A'
    }
];

const HOTELS = [
    { name: 'Hotel Yak & Yeti', city: 'Kathmandu', rating: 4.5, contact: '+977-1-4248999', map: 'https://goo.gl/maps/q4QW2' },
    { name: 'Hotel Shanker', city: 'Kathmandu', rating: 4.2, contact: '+977-1-4410151', map: 'https://goo.gl/maps/rHY3n' },
    { name: 'Hyatt Regency', city: 'Kathmandu', rating: 4.7, contact: '+977-1-5171234', map: 'https://goo.gl/maps/yAbm1' },
    { name: 'Traditional Homes Swotha', city: 'Lalitpur', rating: 4.6, contact: '+977-1-5544747', map: 'https://goo.gl/maps/8Km2j' },
    { name: 'Patan House', city: 'Lalitpur', rating: 4.4, contact: '+977-1-5544888', map: 'https://goo.gl/maps/p9Lm' },
    { name: 'Hotel Heritage', city: 'Bhaktapur', rating: 4.4, contact: '+977-1-6611631', map: 'https://goo.gl/maps/hV1n' },
    { name: 'Milla Guesthouse', city: 'Bhaktapur', rating: 4.8, contact: '+977-1-6614488', map: 'https://goo.gl/maps/m9V2' }
];

async function seed() {
    try {
        const connection = await pool.getConnection();
        console.log('🔌 Connected to database...');

        // Seed Cities
        console.log('🌱 Seeding cities...');
        for (const city of CITIES) {
            await connection.query('INSERT IGNORE INTO cities (name, slug) VALUES (?, ?)', [city.name, city.slug]);
        }

        // Seed Categories
        console.log('🌱 Seeding categories...');
        for (const cat of CATEGORIES) {
            await connection.query('INSERT IGNORE INTO categories (name) VALUES (?)', [cat.name]);
        }

        // Seed Hotels
        console.log('🌱 Seeding hotels...');
        for (const hotel of HOTELS) {
            const [cityRows] = await connection.query('SELECT id FROM cities WHERE name = ?', [hotel.city]);
            if (cityRows.length > 0) {
                await connection.query(
                    'INSERT IGNORE INTO hotels (name, city_id, rating, contact_number, map_link) VALUES (?, ?, ?, ?, ?)',
                    [hotel.name, cityRows[0].id, hotel.rating, hotel.contact, hotel.map]
                );
            }
        }

        // Seed Places
        console.log('🌱 Seeding Heritage Sites with Verified Discovery Videos...');
        for (const place of PLACES) {
            const [cityRows] = await connection.query('SELECT id FROM cities WHERE name = ?', [place.city]);
            const [catRows] = await connection.query('SELECT id FROM categories WHERE name = ?', [place.category]);

            const cityId = cityRows[0]?.id;
            const catId = catRows[0]?.id;
            const slug = place.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

            // Use UPSERT logic to fix existing entries & missing data
            await connection.query(
                `INSERT INTO places 
                (name, slug, city_id, category_id, description, quote, lat, lng, is_featured, beliefs_text, video_url) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                video_url = VALUES(video_url),
                description = VALUES(description),
                quote = VALUES(quote),
                beliefs_text = VALUES(beliefs_text),
                city_id = VALUES(city_id),
                category_id = VALUES(category_id)`,
                [place.name, slug, cityId, catId, place.description, place.quote, place.lat, place.lng, place.is_featured, place.beliefs, place.video]
            );

            // Add/Update Photo
            const [placeRow] = await connection.query('SELECT id FROM places WHERE slug = ?', [slug]);
            if (placeRow.length > 0) {
                const placeId = placeRow[0].id;
                // Ensure only ONE primary photo exists
                await connection.query('DELETE FROM place_photos WHERE place_id = ? AND is_primary = TRUE', [placeId]);
                await connection.query(
                    'INSERT INTO place_photos (place_id, image_url, is_primary) VALUES (?, ?, TRUE)',
                    [placeId, place.image]
                );
            }
        }

        console.log('✨ Mission Journey Joy: Seeding Completed Successfully! All media synchronized. ✨');
        connection.release();
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seed();
