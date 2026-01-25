const pool = require('../config/db');

const RAW_DATA = `Swayambhunath Stupa	swayambhunath-stupa	1	Stupa	Perched atop a hill, this ancient religious complex offers panoramic views of the city. It is often called the "Monkey Temple" due to the holy primates living there.	"Climb the 365 steps to find peace above the clouds."	27.7149	85.2903	Believed to be self-created from a primordial lotus flower.	https://www.youtube.com/embed/JVqVyJWVc7o
Boudhanath Stupa	boudhanath-stupa	1	Stupa	One of the largest spherical stupas in the world, dominating the skyline with its massive mandala. The area is the center of Tibetan culture in Kathmandu.	"Feel the spiritual energy as you circumambulate this giant mandala."	27.7215	85.3620	Circling the stupa washes away bad karma and accumulates merit.	https://www.youtube.com/embed/lnTp349Mx9k
Pashupatinath Temple	pashupatinath-temple	1	Temple	A sacred Hindu temple complex on the banks of the Bagmati River. It is the seat of the national deity, Lord Pashupatinath.	"Witness the cycle of life and death by the sacred river."	27.7104	85.3487	Dedicated to Shiva; dying here ensures a human rebirth.	https://www.youtube.com/embed/RjIjKAT5lAk
Kathmandu Durbar Square	kathmandu-durbar-square	1	Square	The historic seat of royalty where kings were once crowned. The square is a living museum of temples, courtyards, and palaces.	"Walk in the footsteps of ancient Malla kings."	27.7042	85.3065	The square is protected by Kal Bhairav, the fierce form of Shiva.	https://www.youtube.com/embed/4OTMOtQIYmw
Kumari Ghar	kumari-ghar	1	Palace	The residence of the Living Goddess, Kumari, a young girl worshipped as the incarnation of Taleju. Intricate wood carvings adorn the windows.	"Catch a glimpse of the living divinity in her wooden palace."	27.7040	85.3067	Seeing the Kumari brings good fortune and protection.	https://www.youtube.com/embed/4OTMOtQIYmw
Patan Durbar Square	patan-durbar-square	2	Square	Renowned for its exquisite Newar architecture and floor of red bricks. It houses the royal palace and numerous temples.	"Marvel at the city of fine arts and unmatched craftsmanship."	27.6727	85.3253	The square is the heart of Lalitpur's artistic soul.	https://www.youtube.com/embed/lnTp349Mx9k
Krishna Mandir	krishna-mandir-patan	2	Temple	A masterpiece of Shikhara-style architecture built entirely of stone. It is the most important temple in Patan Durbar Square.	"Admire the stone carvings that tell the tales of the Mahabharata."	27.6725	85.3251	Built by King Siddhinarsingh Malla after he saw Krishna in a dream.	https://www.youtube.com/embed/lnTp349Mx9k
Bhaktapur Durbar Square	bhaktapur-durbar-square	3	Square	A plaza in front of the royal palace of the old Bhaktapur Kingdom. It is known for its open spaces and lack of traffic.	"Step back into the medieval era in this open-air museum."	27.6722	85.4285	The Golden Gate here is considered the most beautiful in Nepal.	https://www.youtube.com/embed/JVqVyJWVc7o
Nyatapola Temple	nyatapola-temple	3	Temple	The tallest pagoda temple in Nepal, standing five stories high. It survived the glorious earthquakes of 1934 and 2015.	"Look up at the towering symbol of strength and resilience."	27.6711	85.4294	Dedicated to Siddhi Lakshmi; guardians at the base possess immense strength.	https://www.youtube.com/embed/JVqVyJWVc7o
Changu Narayan	changu-narayan	3	Temple	The oldest known Hindu temple in the Kathmandu Valley, located on a high hilltop. It features some of the finest stone, wood, and metal craft.	"Visit the oldest temple where history is etched in stone."	27.7175	85.4277	Home to Lord Vishnu, it marks the history of the Licchavi period.	https://www.youtube.com/embed/JVqVyJWVc7o
Budhanilkantha	budhanilkantha	1	Statue	Features a large reclining statue of Lord Vishnu floating in a recessed pool of water. It is carved from a single block of black stone.	"See the Sleeping Vishnu floating on a bed of serpents."	27.7667	85.3614	The King of Nepal was traditionally forbidden from visiting this site.	https://www.youtube.com/embed/JVqVyJWVc7o
Golden Temple (Hiranya Varna)	golden-temple-patan	2	Monastery	A spectacular Buddhist monastery in Patan known for its golden facade. Locals call it Kwa Bahal.	"Enter a golden sanctuary hidden in the alleys of Patan."	27.6749	85.3235	Rats here are fed and protected as guardians of the temple.	https://www.youtube.com/embed/lnTp349Mx9k
55 Window Palace	55-window-palace	3	Palace	A masterpiece of wood carving with exactly 55 intricate windows. It was built by King Bhupatindra Malla.	"Count the windows of this architectural marvel."	27.6720	85.4283	The palace was built to allow the king to see his subjects.	https://www.youtube.com/embed/JVqVyJWVc7o
Garden of Dreams	garden-of-dreams	1	Park	A neo-classical historical garden in the midst of Kathmandu city. It offers a quiet oasis with ponds, pavilions, and pergolas.	"Escape the chaos into a European-style neo-classical dream."	27.7145	85.3147	Restored to bring the "Dreams" of Field Marshal Kaiser Shamsher to life.	https://www.youtube.com/embed/JVqVyJWVc7o
Kopan Monastery	kopan-monastery	1	Monastery	A Tibetan Buddhist monastery situated on a hill near Boudhanath. It is famous for its courses on Buddhism and meditation.	"Find your inner peace overlooking the Kathmandu Valley."	27.7423	85.3643	A center for teaching the Dharma to foreigners.	https://www.youtube.com/embed/lnTp349Mx9k
Dakshinkali Temple	dakshinkali-temple	1	Temple	A blood-sacrifice temple dedicated to the Goddess Kali. Located 22km outside Kathmandu in a forest valley.	"Journey to the south for a powerful spiritual experience."	27.6072	85.2633	Tuesdays and Saturdays are auspicious for sacrifices here.	https://www.youtube.com/embed/RjIjKAT5lAk
Dattatreya Temple	dattatreya-temple	3	Temple	A three-story temple believed to be built from the timber of a single tree. It dates back to the 15th century.	"Discover the temple built from a single giant tree."	27.6741	85.4339	Dedicated to Dattatreya, a hybrid deity of Brahma, Vishnu, and Shiva.	https://www.youtube.com/embed/JVqVyJWVc7o
Taleju Temple (Kathmandu)	taleju-temple-ktm	1	Temple	A majestic temple in Durbar Square that is opened to the public only once a year. It stands on a 12-stage plinth.	"Admire the forbidden temple that towers over the square."	27.7045	85.3069	Taleju Bhawani was the patron goddess of the Malla kings.	https://www.youtube.com/embed/4OTMOtQIYmw
Kal Bhairav	kal-bhairav	1	Statue	A massive, colorful stone relief of the fierce manifestation of Lord Shiva. It is located in Kathmandu Durbar Square.	"Face the fierce gaze of the Lord of Terror."	27.7044	85.3063	Lying in front of this statue was believed to cause immediate death.	https://www.youtube.com/embed/4OTMOtQIYmw
Seto Machindranath	seto-machindranath	1	Temple	A temple dedicated to the White Machindranath, located in a courtyard near Asan. It blends Hindu and Buddhist traditions.	"Find the white deity hidden within the bustling market."	27.7077	85.3093	He is the god of rain and compassion.	https://www.youtube.com/embed/JVqVyJWVc7o
Kumbheshwar Temple	kumbheshwar-temple	2	Temple	One of the only two 5-story temples in the valley (the other being Nyatapola). It is dedicated to Lord Shiva.	"Marvel at one of the rare five-story pagodas."	27.6765	85.3239	The water in the pond is believed to come from the holy Gosainkunda lake.	https://www.youtube.com/embed/lnTp349Mx9k
Mahabuddha Temple	mahabuddha-temple	2	Temple	Known as the temple of a thousand Buddhas, made of terracotta tiles. Each brick contains an image of Buddha.	"Count the thousand Buddhas in this terracotta masterpiece."	27.6705	85.3262	Modeled after the Mahabodhi Temple in Bodhgaya, India.	https://www.youtube.com/embed/lnTp349Mx9k
Patan Museum	patan-museum	2	Museum	Housed in the old royal palace, it displays traditional sacred art of Nepal. It is considered one of the best museums in South Asia.	"Explore the finest collection of bronze and brass art."	27.6729	85.3250	The building itself is a restored Malla-era palace.	https://www.youtube.com/embed/lnTp349Mx9k
Siddha Pokhari	siddha-pokhari	3	Water Heritage	A rectangular man-made pond dating back to the Licchavi era. A popular spot for feeding fish and viewing the mountains.	"Reflect by the tranquil waters of the 'Pool of Accomplishment'."	27.6738	85.4214	Also known as Ta Pukhu; legendary serpents are said to dwell here.	https://www.youtube.com/embed/JVqVyJWVc7o
Bhairavnath Temple	bhairavnath-temple	3	Temple	Dedicated to Bhairava, the fierce aspect of Shiva. Located in Taumadhi Square near Nyatapola.	"Stand before the temple of the fierce guardian of Bhaktapur."	27.6713	85.4292	The deity's head was cut off to keep him in Bhaktapur.	https://www.youtube.com/embed/JVqVyJWVc7o
Peacock Window	peacock-window	3	Hidden Gem	A famous intricate wood carving of a peacock found in a side lane of Bhaktapur. It is often called the "Mona Lisa of Nepal".	"Find the Mona Lisa of wood carvings in a narrow alley."	27.6743	85.4345	A supreme example of 15th-century Newar woodcraft.	https://www.youtube.com/embed/JVqVyJWVc7o
Pottery Square	pottery-square	3	Square	An open square full of drying clay pots and artisans at work. You can see the traditional wheel in action.	"Spin the wheel of tradition in the city of devotees."	27.6701	85.4278	The Prajapati caste has maintained this craft for centuries.	https://www.youtube.com/embed/JVqVyJWVc7o
National Museum of Nepal	national-museum-nepal	1	Museum	The oldest museum in Nepal, housing statues, paintings, and weapons. Located near Swayambhu.	"Trace the history of the Himalayas in the National Museum."	27.7126	85.2954	Contains the sword of Napoleon Bonaparte given to Jung Bahadur Rana.	https://www.youtube.com/embed/JVqVyJWVc7o
Narayanhiti Palace Museum	narayanhiti-palace	1	Museum	The former royal palace of the Shah dynasty, now a museum. It was the site of the 2001 Royal Massacre.	"Walk the halls of the last Kings of Nepal."	27.7150	85.3197	The palace is said to be built on a "hit" (water spout) of Narayana.	https://www.youtube.com/embed/JVqVyJWVc7o
Rato Machindranath (Bungamati)	rato-machindranath-bungamati	2	Temple	The winter home of the Red Rain God. Bungamati is a traditional Newar village south of Patan.	"Visit the winter home of the Rain God in a rustic village."	27.6277	85.2985	The deity spends six months here and six months in Patan.	https://www.youtube.com/embed/lnTp349Mx9k
Baglamukhi Temple	baglamukhi-temple	2	Temple	A popular temple in Patan dedicated to the goddess who paralyzes enemies. Devotees wear yellow and offer yellow items.	"Offer yellow flowers to win your battles."	27.6766	85.3240	Worshipped for victory in legal and political battles.	https://www.youtube.com/embed/lnTp349Mx9k
Ashok Stupa (Lagankhel)	ashok-stupa-lagankhel	2	Stupa	One of the four stupas in Patan believed to be built by Emperor Ashoka. It is a large grassy mound.	"Touch a piece of history from Emperor Ashoka's time."	27.6655	85.3245	Marks the southern boundary of the ancient city of Patan.	https://www.youtube.com/embed/lnTp349Mx9k
Kasthamandap	kasthamandap	1	Temple	The "Wooden Pavilion" from which Kathmandu derives its name. Recently rebuilt after the 2015 earthquake.	"Stand in the pavilion that gave Kathmandu its name."	27.7038	85.3056	Legend says it was built from the timber of a single Kalpavriksha tree.	https://www.youtube.com/embed/4OTMOtQIYmw
Guhyeshwori Temple	guhyeshwori-temple	1	Temple	A Shakti Peetha located near Pashupatinath. It is a tantric temple dedicated to Parvati.	"Experience the mystic energy of the Shakti Peetha."	27.7112	85.3512	Believed to be where the knees of Sati fell (Guhya means hidden).	https://www.youtube.com/embed/RjIjKAT5lAk
Bagh Bhairav	bagh-bhairav	1	Temple	A temple in Kirtipur dedicated to Bhairav in the form of a tiger. It offers a great view of the valley.	"Roar with the Tiger God in the historic town of Kirtipur."	27.6793	85.2755	Weapons of defeated enemies are nailed to the temple walls.	https://www.youtube.com/embed/JVqVyJWVc7o
Uma Maheshwar	uma-maheshwar	1	Temple	A three-tiered temple sitting at the highest point of Kirtipur. Famous for its stone elephants and views.	"Enjoy the best sunset view from the top of Kirtipur."	27.6798	85.2743	Offers protection to the town below.	https://www.youtube.com/embed/JVqVyJWVc7o
Pharping Asura Cave	pharping-asura-cave	1	Hidden Gem	A sacred cave where Guru Rinpoche (Padmasambhava) meditated. A major pilgrimage site for Buddhists.	"Meditate where Guru Rinpoche conquered demons."	27.6145	85.2638	The handprint of Guru Rinpoche is imprinted in the rock.	https://www.youtube.com/embed/RjIjKAT5lAk
Bajrayogini (Sankhu)	bajrayogini-sankhu	1	Temple	A tantric temple located in the forests near Sankhu. It is dedicated to the Buddhist deity Vajrayogini.	"Trek through the forest to the Red Goddess of Sankhu."	27.7465	85.4623	The goddess is the guardian of the Kathmandu Valley.	https://www.youtube.com/embed/JVqVyJWVc7o
Shivapuri Nagarjun Park	shivapuri-park	1	Park	A national park on the northern fringe of the valley. It acts as the primary water catchment for Kathmandu.	"Breathe the freshest air in the lungs of Kathmandu."	27.7850	85.3735	Home to the source of the holy Bagmati River.	https://www.youtube.com/embed/JVqVyJWVc7o
Godawari Botanical Garden	godawari-garden	2	Park	A lush botanical garden at the foot of Phulchowki hill. Famous for orchids and bird watching.	"Wander among Himalayan orchids and rare birds."	27.5938	85.3855	A place of tranquility and natural beauty.	https://www.youtube.com/embed/lnTp349Mx9k
Thimi (Balkumari)	thimi-balkumari	3	Hidden Gem	An ancient Newar town famous for pottery and the Balkumari temple. It lies between Kathmandu and Bhaktapur.	"Discover the mask dances of the ancient town of Thimi."	27.6789	85.3970	Balkumari is the guardian goddess of Thimi.	https://www.youtube.com/embed/JVqVyJWVc7o
Kathesimbhu Stupa	kathesimbhu-stupa	1	Stupa	A replica of Swayambhunath located in a courtyard near Thamel. Built for those who cannot climb the hill.	"Visit the 'Swayambhu of the City' without the climb."	27.7088	85.3105	Offers the same merit as visiting the main Swayambhu stupa.	https://www.youtube.com/embed/JVqVyJWVc7o
Itum Bahal	itum-bahal	1	Monastery	One of the largest and oldest Buddhist courtyards in Kathmandu. A quiet sanctuary near the busy Kilagal area.	"Find silence in the largest Buddhist courtyard of the old city."	27.7082	85.3088	Legend says a demon named Gurumapa was pacified here.	https://www.youtube.com/embed/JVqVyJWVc7o
Freak Street (Jhochhen)	freak-street	1	Hidden Gem	The legendary hub of the hippie trail in the 60s and 70s. Located just south of Durbar Square.	"Relive the hippie era in the legendary Jhochhen Tole."	27.7031	85.3060	Once the center of 'Pie and Chai' culture.	https://www.youtube.com/embed/4OTMOtQIYmw
Ranipokhari	ranipokhari	1	Water Heritage	The "Queen's Pond" in the center of Kathmandu. It has a temple in the center which opens on Bhai Tika.	"See the Queen's Pond, a symbol of royal love and grief."	27.7065	85.3152	Built by King Pratap Malla to console his grieving queen.	https://www.youtube.com/embed/JVqVyJWVc7o
Dharahara	dharahara-tower	1	Landmark	A tall white minaret-style tower, recently rebuilt. It is a major landmark of Kathmandu.	"Look up at the white tower, the beacon of Kathmandu."	27.7005	85.3120	Originally built by Prime Minister Bhimsen Thapa.	https://www.youtube.com/embed/JVqVyJWVc7o
Akash Bhairav	akash-bhairav	1	Temple	A temple in Indra Chowk dedicated to the "God of the Sky". The deity is often depicted as a large mask.	"Meet the Sky God in the busiest market of Indra Chowk."	27.7061	85.3090	Believed to be the head of the first Kirat King, Yalambar.	https://www.youtube.com/embed/4OTMOtQIYmw
Annapurna Temple	annapurna-temple	1	Temple	Located in Asan Tole, dedicated to the Goddess of Grain. The temple is filled with coins and grain.	"Offer a coin to the Goddess of Abundance in Asan."	27.7068	85.3109	The goddess ensures the city never goes hungry.	https://www.youtube.com/embed/JVqVyJWVc7o
Ashok Binayak	ashok-binayak	1	Temple	A small but significant Ganesh temple in Kathmandu Durbar Square. Known as the Ganesh without a spike.	"Whisper your wishes to the Ganesh of the Maru Tole."	27.7041	85.3058	Worshipped before starting any new journey or venture.	https://www.youtube.com/embed/4OTMOtQIYmw
Jana Baha (Seto Machindranath)	jana-baha	1	Monastery	The courtyard housing the White Machindranath. It is a hub of cultural activities and lighting of butter lamps.	"Light a butter lamp in the courtyard of compassion."	27.7077	85.3093	The deity cures diseases and brings rain.	https://www.youtube.com/embed/JVqVyJWVc7o
Taragaon Museum	taragaon-museum	1	Museum	A modern architectural gem near Boudha preserving Kathmandu's heritage. The building itself is a work of art.	"Discover the architectural history of the valley."	27.7208	85.3601	Documenting the changing landscape of Kathmandu.	https://www.youtube.com/embed/lnTp349Mx9k
Baber Mahal Revisited	baber-mahal-revisited	1	Palace	A complex of courtyards restored from an old Rana palace. Now hosts chic shops and restaurants.	"Dine and shop in the grandeur of the Rana era."	27.6942	85.3238	A fusion of Neoclassical and Newar architecture.	https://www.youtube.com/embed/JVqVyJWVc7o
Ichangu Narayan	ichangu-narayan	1	Temple	One of the four main Narayan temples, located northwest of Swayambhu. Less visited but historically significant.	"Find solitude at the western guardian temple of Vishnu."	27.7270	85.2750	Protects the western flank of the valley.	https://www.youtube.com/embed/JVqVyJWVc7o
Taudaha Lake	taudaha-lake	1	Water Heritage	A natural lake believed to be the remnant of the ancient Nagdaha lake. It is a haven for migratory birds.	"Spot migratory birds at the home of the Serpent King."	27.6485	85.2825	Legend says the King of Serpents, Karkotaka, lives here.	https://www.youtube.com/embed/RjIjKAT5lAk
White Gumba (Seto Gumba)	white-gumba	1	Monastery	A beautiful white monastery situated on a hill north of Swayambhu. Offers spectacular sunset views.	"Watch the sunset turn the White Monastery gold."	27.7285	85.2735	Also known as Druk Amitabha Mountain.	https://www.youtube.com/embed/JVqVyJWVc7o
Chandraagiri Hills	chandragiri-hills	1	Landmark	A high hill station with a cable car and Bhaleshwor Mahadev temple. Offers a view of Everest on clear days.	"Ride the cable car to the best viewpoint in the valley."	27.6685	85.2065	Prithvi Narayan Shah viewed the valley from here before conquering it.	https://www.youtube.com/embed/JVqVyJWVc7o
Rudra Varna Mahavihar	rudra-varna-mahavihar	2	Monastery	A historic Buddhist monastery in Patan, used for coronation ceremonies. It is packed with bronze statues.	"Step into the coronation site of ancient artisans."	27.6710	85.3265	One of the oldest monasteries in Lalitpur.	https://www.youtube.com/embed/lnTp349Mx9k
Bhimsen Temple	bhimsen-temple-patan	2	Temple	A temple in Patan Durbar Square dedicated to the god of trade and commerce. It has a distinct rectangular plan.	"Pray for prosperity at the temple of the Business God."	27.6732	85.3251	Bhimsen is the patron deity of the Newar merchant community.	https://www.youtube.com/embed/lnTp349Mx9k
Vishwanath Temple	vishwanath-temple-patan	2	Temple	Dedicated to Shiva, guarding the Patan Durbar Square. Features erotic wood carvings on the struts.	"Admire the intricate carvings of the stone guardians."	27.6730	85.3252	The bull (Nandi) guarding the temple is a key feature.	https://www.youtube.com/embed/lnTp349Mx9k
Manga Hiti	manga-hiti	2	Water Heritage	An ancient stone water spout functioning in Patan Durbar Square. It lies below street level.	"Drink from the spout that has quenched thirsts for centuries."	27.6731	85.3255	The water is said to be cool in summer and warm in winter.	https://www.youtube.com/embed/lnTp349Mx9k
Pimbahal Pokhari	pimbahal-pokhari	2	Water Heritage	A large pond in Patan with a pavilion in the middle. A great place to relax and watch the reflection of the city.	"Relax by the pond that mirrors the sky of Patan."	27.6762	85.3215	Restored to its former glory, it's a community favorite.	https://www.youtube.com/embed/lnTp349Mx9k
Jawalakhel Zoo	central-zoo	2	Park	The only zoo in Nepal, housing tigers, rhinos, and elephants. Located in the heart of Lalitpur.	"Meet the Royal Bengal Tiger in the heart of the city."	27.6720	85.3130	Originally a private zoo for the Rana Prime Ministers.	https://www.youtube.com/embed/lnTp349Mx9k
Ashok Stupa (Pulchowk)	ashok-stupa-pulchowk	2	Stupa	Another of the four Ashoka Stupas, located at the busy Pulchowk intersection. It is painted white.	"Find serenity at the stupa in the middle of the bustle."	27.6785	85.3175	Believed to contain relics of the Buddha.	https://www.youtube.com/embed/lnTp349Mx9k
Phulchowki Hill	phulchowki-hill	2	Park	The highest hill surrounding the Kathmandu Valley. Famous for snow in winter and birdwatching.	"Touch the snow on the highest peak of the valley rim."	27.5680	85.3975	The patron goddess Phulchowki Mai resides at the top.	https://www.youtube.com/embed/lnTp349Mx9k
Khokana Village	khokana-village	2	Hidden Gem	A traditional Newar farming village famous for mustard oil. It retains its medieval charm.	"Smell the fresh mustard oil in the living heritage village."	27.6360	85.2925	Famous for the unique Rudrayani festival.	https://www.youtube.com/embed/lnTp349Mx9k
Bajrabarahi Temple	bajrabarahi-temple	2	Temple	A tantric temple located in a dense forest south of Patan. It has no spire (gajur).	"Walk the forest path to the roofless temple of power."	27.6045	85.3340	The goddess is a form of Matrika (Mother Goddess).	https://www.youtube.com/embed/lnTp349Mx9k
Karya Binayak	karya-binayak	2	Temple	A Ganesh temple in Bungamati, worshipped for the successful completion of work. Located on a hillock.	"Start your new venture with a blessing from Karya Binayak."	27.6255	85.2975	"Karya" means work; he is the remover of obstacles.	https://www.youtube.com/embed/lnTp349Mx9k
Minnath Temple	minnath-temple	2	Temple	Located near Rato Machindranath in Patan. Minnath is considered the "Red God's" companion.	"Visit the 'small' god who accompanies the great rain deity."	27.6705	85.3260	Also known as Jatadhari Lokeshvara.	https://www.youtube.com/embed/lnTp349Mx9k
Vatsala Durga Temple	vatsala-durga	3	Temple	A stone temple in Bhaktapur known for its "Barking Bell". It has intricate stone carvings.	"Ring the bell that dogs bark at in Bhaktapur Square."	27.6720	85.4284	The bell was used to sound the curfew in olden times.	https://www.youtube.com/embed/JVqVyJWVc7o
Golden Gate	golden-gate-bhaktapur	3	Palace	The magnificent entrance to the 55 Window Palace. A masterpiece of repoussé metalwork.	"Pass through the most beautiful gate in the entire kingdom."	27.6721	85.4286	Features the goddess Taleju and the Garuda.	https://www.youtube.com/embed/JVqVyJWVc7o
Nilbarahi Temple	nilbarahi-temple	3	Hidden Gem	A tantric temple located in the forests of Bode, Thimi. Known for the Nilbarahi dance festival.	"Dance with the spirits in the sacred forest of Bode."	27.6885	85.3850	The dancers are believed to be possessed by the deities.	https://www.youtube.com/embed/JVqVyJWVc7o
Surya Binayak	surya-binayak	3	Temple	A Ganesh temple located in a forest south of Bhaktapur. Known as the Ganesh of the rising sun.	"Catch the first rays of the sun with Lord Ganesh."	27.6635	85.4190	Parents bring children here to help them learn to speak/walk.	https://www.youtube.com/embed/JVqVyJWVc7o
Kamal Binayak	kamal-binayak	3	Temple	A Ganesh temple located near the Kamal Pokhari in Bhaktapur. Popular among locals.	"Find peace by the Lotus Pond of Bhaktapur."	27.6760	85.4355	A major site during the Bisket Jatra festival.	https://www.youtube.com/embed/JVqVyJWVc7o
Nava Durga Temple	nava-durga-temple	3	Temple	Dedicated to the Nine Durgas, the protective goddesses of Bhaktapur. The temple houses the masks of the deities.	"Witness the home of the masked guardian goddesses."	27.6755	85.4320	The masks are burned and remade every year.	https://www.youtube.com/embed/JVqVyJWVc7o
Kailashnath Mahadev	kailashnath-mahadev	3	Statue	The world's tallest Shiva statue, standing 143 feet tall. Located on the border of Bhaktapur.	"Stand in the shadow of the world's tallest Shiva."	27.6440	85.4735	A modern marvel representing the glory of Lord Shiva.	https://www.youtube.com/embed/JVqVyJWVc7o
Pilot Baba Ashram	pilot-baba-ashram	3	Landmark	A spiritual retreat center located on a hill near Suryabinayak. Offers grand views and a peaceful atmosphere.	"Meditate above the clouds at the Pilot Baba Ashram."	27.6495	85.4185	Established by a fighter pilot turned saint.	https://www.youtube.com/embed/JVqVyJWVc7o
Nagarkot View Tower	nagarkot-view-tower	3	Hidden Gem	While famous, the tower offers the best sunrise view of the Himalayas. Located on the Bhaktapur ridge.	"Watch the sun set fire to the Himalayas at dawn."	27.7170	85.5200	On a clear day, you can see Mt. Everest.	https://www.youtube.com/embed/JVqVyJWVc7o
Bijeshwori Temple	bijeshwori-temple	1	Temple	A temple dedicated to the Sky-Goer goddess, located near Swayambhu. Important for Newar Buddhists.	"Visit the temple of the Flying Goddess."	27.7115	85.2970	Associated with the cycle of life and death.	https://www.youtube.com/embed/JVqVyJWVc7o
Shobha Bhagawati	shobha-bhagawati	1	Temple	A Shakti Peetha on the bank of the Bishnumati river. One of the four main Bhagawatis of the valley.	"Seek strength from the goddess by the Bishnumati river."	27.7135	85.2980	Worshipped for power and success.	https://www.youtube.com/embed/JVqVyJWVc7o
Indra Chowk	indra-chowk	1	Square	A vibrant market square known for its textile shops and the Akash Bhairav temple. The intersection of six roads.	"Get lost in the colorful fabric of Kathmandu's trade."	27.7060	85.3090	Named after Indra, the King of Heaven.	https://www.youtube.com/embed/4OTMOtQIYmw
Jagannath Temple	jagannath-temple-ktm	1	Temple	Famous for the erotic carvings on its roof struts. Located in the Kathmandu Durbar Square.	"Interpret the carvings of the famous Jagannath Temple."	27.7043	85.3066	One of the oldest structures in the Durbar Square.	https://www.youtube.com/embed/4OTMOtQIYmw
Sankata Temple	sankata-temple	1	Temple	Located at Te Bahal, dedicated to the deity who wards off bad luck. Very crowded on Saturdays.	"Ward off your bad luck at the shrine of Sankata."	27.6995	85.3125	The deity is worshipped to remove obstacles and misfortunes.	https://www.youtube.com/embed/JVqVyJWVc7o
Mahankal Temple	mahankal-temple	1	Temple	A temple dedicated to the Great Time/Death (Mahankal) near Tundikhel. Worshipped by both Hindus and Buddhists.	"Bow before the Lord of Time near the city parade ground."	27.7010	85.3135	He is the protector of the dharma.	https://www.youtube.com/embed/JVqVyJWVc7o
Bhadrakali Temple	bhadrakali-temple	1	Temple	Located near the Army Headquarters, dedicated to the fierce goddess Bhadrakali. Also known as Lumari.	"Find solace in the temple of the fierce protectress."	27.6975	85.3155	Legend says the goddess emerged from the ground here.	https://www.youtube.com/embed/JVqVyJWVc7o
Singha Durbar	singha-durbar	1	Palace	The "Lion Palace," formerly a Rana palace, now the government secretariat. A grand example of Neoclassical architecture.	"View the seat of Nepal's government from the outside gates."	27.6980	85.3240	Originally the largest palace in Asia with over 1,000 rooms.	https://www.youtube.com/embed/JVqVyJWVc7o
Taleju Bell	taleju-bell-patan	2	Statue	A giant bell in Patan Durbar Square. It was used to petition the King for grievances.	"Ring the bell of justice in the royal square."	27.6728	85.3253	If the bell rang, the King had to come out to hear the complaint.	https://www.youtube.com/embed/lnTp349Mx9k
Chyasin Dega	chyasin-dega	2	Temple	An octagonal stone temple in Patan dedicated to Krishna. It stands near the palace entrance.	"Circle the octagonal temple of the Blue God."	27.6726	85.3254	A fine example of the Granthakuta style of architecture.	https://www.youtube.com/embed/lnTp349Mx9k
Sundari Chowk	sundari-chowk	2	Palace	The most beautiful courtyard of the Patan Royal Palace. Features the sunken royal bath, Tusa Hiti.	"Marvel at the Royal Bath in the 'Beautiful Courtyard'."	27.6724	85.3252	The stone carvings in the bath are unmatched in detail.	https://www.youtube.com/embed/lnTp349Mx9k
Tusa Hiti	tusa-hiti	2	Water Heritage	The royal bath inside Sundari Chowk. It is a masterpiece of stone art with gold-gilded spout.	"See where the Malla Kings bathed in golden luxury."	27.6724	85.3252	Contains carvings of Ashta Matrikas and Ashta Bhairavs.	https://www.youtube.com/embed/lnTp349Mx9k
Char Narayan Temple	char-narayan	2	Temple	The oldest temple in Patan Durbar Square. Dedicated to Narayan (Vishnu).	"Pay respects at the oldest guardian of Patan Square."	27.6728	85.3251	Collapsed in 2015 but beautifully restored.	https://www.youtube.com/embed/lnTp349Mx9k
Balkumari Temple (Patan)	balkumari-patan	2	Temple	A temple dedicated to the child goddess Balkumari in Lalitpur. Distinct from the Thimi one.	"Visit the guardian goddess of the southern gate."	27.6650	85.3320	Associated with the protection of children.	https://www.youtube.com/embed/lnTp349Mx9k
Gwarko Mahavihar	gwarko-mahavihar	2	Monastery	A hidden Buddhist monastery in the Gwarko area. Less visited by tourists.	"Discover the hidden monastery of the Gwarko toll."	27.6660	85.3350	A center for local Newar Buddhist rituals.	https://www.youtube.com/embed/lnTp349Mx9k
Uma Maheshwar (Kirtipur)	uma-maheshwar-kirtipur	1	Temple	(Note: Distinct entry for specific view). Famous for its stone elephants and stairs.	"Climb the stone stairs guarded by elephants."	27.6798	85.2743	Survived the 2015 earthquake with minor damage.	https://www.youtube.com/embed/JVqVyJWVc7o
Chilancho Stupa	chilancho-stupa	1	Stupa	An ancient stupa located in Kirtipur. Surrounded by four smaller stupas.	"Find the ancient stupa at the heart of Kirtipur."	27.6785	85.2765	Built by Emperor Ashoka according to local legend.	https://www.youtube.com/embed/JVqVyJWVc7o
Nakaadesh (Thimi)	nakaadesh	3	Hidden Gem	The "New Country" (Nakaadesh) part of Thimi. Known for traditional weaving and masks.	"Explore the 'New Country' of ancient Thimi."	27.6800	85.3900	Famous for the Mahakali dance.	https://www.youtube.com/embed/JVqVyJWVc7o
Hanuman Dhoka Palace	hanuman-dhoka	1	Palace	The main royal palace complex in Kathmandu. Named after the statue of Hanuman at the gate.	"Enter the red gates guarded by the Monkey God."	27.7042	85.3065	The monkey god is covered in red vermillion paste.	https://www.youtube.com/embed/4OTMOtQIYmw
Maju Dega	maju-dega	1	Temple	A large temple in Kathmandu Durbar Square with high steps. A popular meeting spot for locals.	"Sit on the high steps and watch the world go by."	27.7040	85.3062	Dedicated to Shiva; the steps represent the levels of enlightenment.	https://www.youtube.com/embed/4OTMOtQIYmw
Shiva Parvati Temple	shiva-parvati-temple	1	Temple	A temple where Shiva and Parvati look out from the top window. A symbol of divine couple.	"Wave to the divine couple watching from the window."	27.7041	85.3061	The divine couple is depicted like ordinary humans watching a show.	https://www.youtube.com/embed/4OTMOtQIYmw
Gaddi Baithak	gaddi-baithak	1	Palace	A white neoclassical building in Durbar Square. Used for state ceremonies.	"Admire the European style in the heart of the medieval square."	27.7039	85.3063	Built by the Ranas to impress European visitors.	https://www.youtube.com/embed/4OTMOtQIYmw
Aviation Museum	aviation-museum	1	Museum	Housed inside a grounded Airbus 330 near the airport. A unique museum experience.	"Walk inside a real jet plane turned into a museum."	27.6935	85.3550	Inspiring the next generation of pilots.	https://www.youtube.com/embed/JVqVyJWVc7o`;

async function bulkImport() {
    try {
        const connection = await pool.getConnection();
        console.log('🔌 Connected to database for Bulk Import...');

        const rows = RAW_DATA.split('\n').filter(line => line.trim());

        // 1. Identify all unique categories
        const categoriesInData = [...new Set(rows.map(line => line.split('\t')[3]))];
        console.log('📦 Categories found in data:', categoriesInData);

        // 2. Ensure all categories exist in parent table
        for (const cat of categoriesInData) {
            await connection.query('INSERT IGNORE INTO categories (name) VALUES (?)', [cat]);
        }

        // 3. Fetch all categories to create a Map Name -> ID
        const [catRows] = await connection.query('SELECT id, name FROM categories');
        const catMap = {};
        catRows.forEach(row => catMap[row.name] = row.id);
        console.log('✅ Categories Mapped.');

        // 4. Process and Insert Places
        console.log(`🚀 Processing ${rows.length} rows...`);
        for (const line of rows) {
            const parts = line.split('\t');
            if (parts.length < 10) continue;

            const [name, slug, city_id, cat_name, description, quote, lat, lng, beliefs, video] = parts;
            const category_id = catMap[cat_name];

            if (!category_id) {
                console.warn(`⚠️ skipping ${name} - Category ${cat_name} not found.`);
                continue;
            }

            // Insert or Update Place
            await connection.query(
                `INSERT INTO places 
                (name, slug, city_id, category_id, description, quote, lat, lng, is_featured, beliefs_text, video_url) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
                ON DUPLICATE KEY UPDATE 
                category_id = VALUES(category_id),
                description = VALUES(description),
                quote = VALUES(quote),
                beliefs_text = VALUES(beliefs_text),
                video_url = VALUES(video_url),
                lat = VALUES(lat),
                lng = VALUES(lng)`,
                [name, slug, city_id, category_id, description, quote, lat, lng, beliefs, video]
            );

            // 5. Add Placeholder Photo if none exists
            const [placeRow] = await connection.query('SELECT id FROM places WHERE slug = ?', [slug]);
            if (placeRow.length > 0) {
                const placeId = placeRow[0].id;
                const [photoExists] = await connection.query('SELECT id FROM place_photos WHERE place_id = ?', [placeId]);
                if (photoExists.length === 0) {
                    // Use a generic beautiful Nepal/Heritage placeholder until user updates
                    const placeholder = 'https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=2070';
                    await connection.query('INSERT INTO place_photos (place_id, image_url, is_primary) VALUES (?, ?, TRUE)', [placeId, placeholder]);
                }
            }
        }

        console.log('✨ Bulk Import Complete: 100 Sites Synchronized! ✨');
        connection.release();
        process.exit(0);
    } catch (err) {
        console.error('❌ Bulk Import Failed:', err);
        process.exit(1);
    }
}

bulkImport();
