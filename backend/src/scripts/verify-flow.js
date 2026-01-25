// Verification script using native fetch

async function verify() {
    const baseUrl = 'http://localhost:5000/api';
    console.log('🧪 Starting Full-Stack Logic Verification...');

    try {
        // 1. Register
        console.log('1. Registering new user...');
        const regRes = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'testuser_' + Date.now(), password: 'password123' })
        });
        const regData = await regRes.json();
        if (!regRes.ok) throw new Error('Registration failed: ' + JSON.stringify(regData));
        const token = regData.token;
        console.log('✅ User registered.');

        // 2. Get Places
        console.log('2. Fetching places...');
        const placesRes = await fetch(`${baseUrl}/places`);
        const places = await placesRes.json();
        const targetPlace = places[0];
        console.log(`✅ Found place: ${targetPlace.name}`);

        // 3. Mark Visited
        console.log(`3. Marking ${targetPlace.name} as visited...`);
        const visitRes = await fetch(`${baseUrl}/places/${targetPlace.id}/visit`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!visitRes.ok) throw new Error('Visit marking failed');
        console.log('✅ Visited marked.');

        // 4. Verify in Dashboard (My Visits)
        console.log('4. Verifying visits list...');
        const myVisitsRes = await fetch(`${baseUrl}/me/visits`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const myVisits = await myVisitsRes.json();

        const found = myVisits.find(v => v.id === targetPlace.id);
        if (found) {
            console.log('🎉 VERIFICATION SUCCESSFUL: Place found in user visits list!');
        } else {
            throw new Error('Verification failed: Place not found in visits');
        }

    } catch (err) {
        console.error('❌ Verification failed:', err.message);
        process.exit(1);
    }
}

verify();
