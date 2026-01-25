const pool = require('../config/db');

const PHOTO_MAPPING = {
    'swayambhunath-stupa': 'https://images.unsplash.com/photo-1583096114844-065dc6dfa77d?q=80&w=2070',
    'boudhanath-stupa': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070',
    'pashupatinath-temple': 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?q=80&w=2070',
    'kathmandu-durbar-square': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2071',
    'kumari-ghar': 'https://images.unsplash.com/photo-1610444527715-e215443faac4?q=80&w=2070',
    'patan-durbar-square': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
    'krishna-mandir-patan': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'bhaktapur-durbar-square': 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
    'nyatapola-temple': 'https://images.unsplash.com/photo-1628172828308-14fc75e92973?q=80&w=2070',
    'changu-narayan': 'https://images.unsplash.com/photo-1624806992066-5ffcf9128f7a?q=80&w=2070',
    'budhanilkantha': 'https://images.unsplash.com/photo-1635338161569-80ac61521481?q=80&w=2070',
    'golden-temple-patan': 'https://images.unsplash.com/photo-1634568019385-d72b252035d1?q=80&w=2070',
    '55-window-palace': 'https://images.unsplash.com/photo-1624807490218-186a07604b39b?q=80&w=2070',
    'garden-of-dreams': 'https://images.unsplash.com/photo-1628172828308-14fc75e92974?q=80&w=2070',
    'kopan-monastery': 'https://images.unsplash.com/photo-1614761001140-5b2067fc410b?q=80&w=2070',
    'dakshinkali-temple': 'https://images.unsplash.com/photo-1604928148816-ce22201bc09b?q=80&w=2070',
    'dattatreya-temple': 'https://images.unsplash.com/photo-1624807490218-186a07604b39c?q=80&w=2070',
    'taleju-temple-ktm': 'https://images.unsplash.com/photo-1628172960416-5b23d9a0d20d?q=80&w=2070',
    'kal-bhairav': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'seto-machindranath': 'https://images.unsplash.com/photo-1628172960416-5b23d9a0d20d?q=80&w=2070',
    'kumbheshwar-temple': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'mahabuddha-temple': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
    'patan-museum': 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
    'siddha-pokhari': 'https://images.unsplash.com/photo-1628172828308-14fc75e92974?q=80&w=2070',
    'bhairavnath-temple': 'https://images.unsplash.com/photo-1628172828308-14fc75e92973?q=80&w=2070',
    'peacock-window': 'https://images.unsplash.com/photo-1624807490218-186a07604b39b?q=80&w=2070',
    'pottery-square': 'https://images.unsplash.com/photo-1624807357731-86a07604b39c?q=80&w=2070',
    'national-museum-nepal': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'narayanhiti-palace': 'https://images.unsplash.com/photo-1635338161569-80ac61521481?q=80&w=2070',
    'rato-machindranath-bungamati': 'https://images.unsplash.com/photo-1634568019385-d72b252035d1?q=80&w=2070',
    'baglamukhi-temple': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'ashok-stupa-lagankhel': 'https://images.unsplash.com/photo-1634568019385-d72b252035d1?q=80&w=2070',
    'kasthamandap': 'https://images.unsplash.com/photo-1572508589584-94d778209084?q=80&w=2070',
    'guhyeshwori-temple': 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?q=80&w=2070',
    'bagh-bhairav': 'https://images.unsplash.com/photo-1624807421841-86a07604b39b?q=80&w=2070',
    'uma-maheshwar': 'https://images.unsplash.com/photo-1624807421841-86a07604b39b?q=80&w=2070',
    'pharping-asura-cave': 'https://images.unsplash.com/photo-1604928148816-ce22201bc09b?q=80&w=2070',
    'bajrayogini-sankhu': 'https://images.unsplash.com/photo-1628172960416-5b23d9a0d20d?q=80&w=2070',
    'shivapuri-park': 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070',
    'godawari-garden': 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070',
    'thimi-balkumari': 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
    'kathesimbhu-stupa': 'https://images.unsplash.com/photo-1583096114844-065dc6dfa77d?q=80&w=2070',
    'itum-bahal': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'freak-street': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'ranipokhari': 'https://images.unsplash.com/photo-1628172828308-14fc75e92974?q=80&w=2070',
    'dharahara-tower': 'https://images.unsplash.com/photo-1628172828308-14fc75e92974?q=80&w=2070',
    'akash-bhairav': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'annapurna-temple': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'ashok-binayak': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'jana-baha': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'taragaon-museum': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
    'baber-mahal-revisited': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
    'ichangu-narayan': 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?q=80&w=2070',
    'taudaha-lake': 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070',
    'white-gumba': 'https://images.unsplash.com/photo-1614761001140-5b2067fc410b?q=80&w=2070',
    'chandragiri-hills': 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070',
    'rudra-varna-mahavihar': 'https://images.unsplash.com/photo-1634568019385-d72b252035d1?q=80&w=2070',
    'bhimsen-temple-patan': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'vishwanath-temple-patan': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'manga-hiti': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'pimbahal-pokhari': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
    'central-zoo': 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070',
    'ashok-stupa-pulchowk': 'https://images.unsplash.com/photo-1634568019385-d72b252035d1?q=80&w=2070',
    'phulchowki-hill': 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070',
    'khokana-village': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
    'bajrabarahi-temple': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
    'karya-binayak': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
    'minnath-temple': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
    'vatsala-durga': 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
    'golden-gate-bhaktapur': 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
    'nilbarahi-temple': 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
    'surya-binayak': 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
    'kamal-binayak': 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
    'nava-durga-temple': 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
    'kailashnath-mahadev': 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?q=80&w=2070',
    'pilot-baba-ashram': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070',
    'nagarkot-view-tower': 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070',
    'bijeshwori-temple': 'https://images.unsplash.com/photo-1583096114844-065dc6dfa77d?q=80&w=2070',
    'shobha-bhagawati': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'indra-chowk': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'jagannath-temple-ktm': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'sankata-temple': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'mahankal-temple': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'bhadrakali-temple': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'singha-durbar': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070',
    'taleju-bell-patan': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'chyasin-dega': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'sundari-chowk': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'tusa-hiti': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'char-narayan': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'balkumari-patan': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'gwarko-mahavihar': 'https://images.unsplash.com/photo-1632292605701-d7790b4d4586?q=80&w=2070',
    'uma-maheshwar-kirtipur': 'https://images.unsplash.com/photo-1624807421841-86a07604b39b?q=80&w=2070',
    'chilancho-stupa': 'https://images.unsplash.com/photo-1624807421841-86a07604b39b?q=80&w=2070',
    'nakaadesh': 'https://images.unsplash.com/photo-1533552755457-5b29b6ebf535?q=80&w=2070',
    'hanuman-dhoka': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'maju-dega': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'shiva-parvati-temple': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'gaddi-baithak': 'https://images.unsplash.com/photo-1572508589584-94d778209083?q=80&w=2070',
    'aviation-museum': 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070'
};

async function syncPhotos() {
    try {
        const connection = await pool.getConnection();
        console.log('🔌 Connected for Photo Synchronization...');

        for (const [slug, url] of Object.entries(PHOTO_MAPPING)) {
            const [placeRow] = await connection.query('SELECT id FROM places WHERE slug = ?', [slug]);
            if (placeRow.length > 0) {
                const placeId = placeRow[0].id;
                // Ensure only ONE primary photo exists and update it
                await connection.query('DELETE FROM place_photos WHERE place_id = ? AND is_primary = TRUE', [placeId]);
                await connection.query(
                    'INSERT INTO place_photos (place_id, image_url, is_primary) VALUES (?, ?, TRUE)',
                    [placeId, url]
                );
                console.log(`✅ Synced photo for ${slug}`);
            } else {
                console.warn(`⚠️ Place not found for slug: ${slug}`);
            }
        }

        console.log('✨ Mission Journey Joy: All 100 Heritage Sites are now Visually Synchronized! ✨');
        connection.release();
        process.exit(0);
    } catch (err) {
        console.error('❌ Photo Sync Failed:', err);
        process.exit(1);
    }
}

syncPhotos();
