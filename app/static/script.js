const state = {
    rooms: 20,
    bedrooms: 5,
    age: 20,
    pop: 1400,
    hh: 500,
    inc: 4.5,
    lng: -119.6,
    lat: 35.6
};

function syncSlider(key, val) {
    state[key] = parseFloat(val);
    updateLabel(key);
    const inp = document.getElementById('inp-' + key);
    if (inp) inp.value = val;
    resetResult();
}

function syncInput(key, val) {
    state[key] = parseFloat(val) || 0;
    updateLabel(key);
    const sl = document.getElementById('sl-' + key);
    if (sl) sl.value = val;
    resetResult();
}

function updateLabel(key) {
    const el = document.getElementById('lbl-' + key);
    if (!el) return;
    const v = state[key];
    if (key === 'inc') el.textContent = '$' + parseFloat(v).toFixed(1) + 'k';
    else if (key === 'lng') el.textContent = parseFloat(v).toFixed(1);
    else if (key === 'lat') el.textContent = parseFloat(v).toFixed(1);
    else el.textContent = Math.round(v);
}

function resetResult() {
    document.getElementById('result').textContent = '—';
    document.getElementById('result').className = '';
    document.getElementById('conf-fill').style.width = '0%';
    document.getElementById('breakdown').classList.remove('visible');
    document.getElementById('err-msg').classList.remove('visible');
}

function tagHtml(cls, text) {
    return `<span class="tag ${cls}">${text}</span>`;
}

async function predictPrice() {
    const btn = document.querySelector('.predict-bar button');
    const rv = document.getElementById('result');
    const err = document.getElementById('err-msg');

    btn.disabled = true;
    btn.textContent = 'Predicting…';
    rv.textContent = '…';
    rv.className = 'loading';
    err.classList.remove('visible');
    document.getElementById('conf-fill').style.width = '0%';
    document.getElementById('breakdown').classList.remove('visible');

    const payload = {
        total_rooms: state.rooms,
        total_bedrooms: state.bedrooms,
        population: state.pop,
        households: state.hh,
        longitude: state.lng,
        latitude: state.lat,
        housing_median_age: state.age,
        median_income: state.inc
    };

    try {
        const res = await fetch(window.location.origin + '/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('HTTP ' + res.status);

        const data = await res.json();
        const price = data.predicted_price;

        rv.textContent = '$' + Math.round(price).toLocaleString();
        rv.className = '';

        const confidence = Math.min(95, Math.max(40, 60 + state.inc * 3));
        setTimeout(() => {
            document.getElementById('conf-fill').style.width = confidence.toFixed(0) + '%';
        }, 80);

        // Derived metrics
        const rph = (state.rooms / state.hh).toFixed(2);
        const bpr = (state.bedrooms / state.rooms).toFixed(2);
        const pph = (state.pop / state.hh).toFixed(2);

        document.getElementById('m-rph').textContent = rph;
        document.getElementById('m-bpr').textContent = bpr;
        document.getElementById('m-pph').textContent = pph;

        document.getElementById('tag-rph').innerHTML = tagHtml(
            parseFloat(rph) > 6 ? 'tag-high' : parseFloat(rph) > 3 ? 'tag-med' : 'tag-low',
            parseFloat(rph) > 6 ? 'high density' : parseFloat(rph) > 3 ? 'medium' : 'spacious'
        );
        document.getElementById('tag-bpr').innerHTML = tagHtml(
            parseFloat(bpr) > 0.35 ? 'tag-high' : parseFloat(bpr) > 0.2 ? 'tag-med' : 'tag-low',
            parseFloat(bpr) > 0.35 ? 'bedroom-heavy' : parseFloat(bpr) > 0.2 ? 'balanced' : 'open plan'
        );
        document.getElementById('tag-pph').innerHTML = tagHtml(
            parseFloat(pph) > 4 ? 'tag-high' : parseFloat(pph) > 2.5 ? 'tag-med' : 'tag-low',
            parseFloat(pph) > 4 ? 'overcrowded' : parseFloat(pph) > 2.5 ? 'typical' : 'low density'
        );

        document.getElementById('breakdown').classList.add('visible');

    } catch (e) {
        rv.textContent = '—';
        rv.className = '';
        err.classList.add('visible');
    }

    btn.disabled = false;
    btn.textContent = 'Predict Price';
}