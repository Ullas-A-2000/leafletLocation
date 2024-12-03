let loading = false;
let debounceTimeout = null;

async function openCage(e) {
  e.preventDefault();
  const search = e.target.value.trim();

  const dropdown = document.querySelector("#openCageDropdown");

  if (!search) {
    document.querySelectorAll('.list-group-item').forEach(item => item.remove());
    document.querySelectorAll('.list-group-item-load').forEach(item => item.remove());
    return;
  }

  clearTimeout(debounceTimeout);


  debounceTimeout = setTimeout(async () => {
    if (loading) return;
    loading = true;
    const loadLi = document.createElement("li");
    loadLi.innerHTML = 'Loading...';
    loadLi.classList.add("list-group-item-load");
    dropdown.appendChild(loadLi);

    try {
      const response = await axios.get(`https://api.opencagedata.com/geosearch?q=${encodeURIComponent(search)}&language=en`, {
        headers: {
          "opencage-geosearch-key": "oc_gs_codependemo74gzf48ew7fdvs91nba",
          "origin": "http://127.0.0.1:5500"
        }
      });

      document.querySelectorAll('.list-group-item-load').forEach(item => item.remove());
      document.querySelectorAll('.list-group-item').forEach(item => item.remove());

      if (response?.data?.results?.length > 0) {
        response.data.results.forEach(res => {
          const li = document.createElement("li");
          li.innerHTML = res.formatted;
          li.classList.add("list-group-item");
          dropdown.appendChild(li);
        });
      } else {
        const noResultsLi = document.createElement("li");
        noResultsLi.innerHTML = "No results found.";
        noResultsLi.classList.add("list-group-item");
        dropdown.appendChild(noResultsLi);
      }
    } catch (error) {
      document.querySelectorAll('.list-group-item-load').forEach(item => item.remove());
      document.querySelectorAll('.list-group-item').forEach(item => item.remove());
    } finally {
      loading = false;
    }
  }, 300);
}



async function astroApi(e) {
    e.preventDefault();
    const search = e.target.value.trim();
  
    const dropdown = document.querySelector("#tomtomDropdown");
  
    if (!search) {
      document.querySelectorAll('.list-group-item').forEach(item => item.remove());
      document.querySelectorAll('.list-group-item-load').forEach(item => item.remove());
      return;
    }
  
    clearTimeout(debounceTimeout);
  
  
    debounceTimeout = setTimeout(async () => {
      if (loading) return;
      loading = true;
      const loadLi = document.createElement("li");
      loadLi.innerHTML = 'Loading...';
      loadLi.classList.add("list-group-item-load");
      dropdown.appendChild(loadLi);
  
      try {
        const base64Credentials = btoa(`${634034}:${'e5468d2fc981c68ddd64d9ab392ae86a9fb19144'}`);
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&addressdetails=1&city=${search}`,
            {
                "place": search,
                "maxRows": 7
            },
            {
              headers: {
                "Authorization": `Basic ${base64Credentials}`
              }
            }
          );
          console.log(response.data.geonames, 'response');
  
        document.querySelectorAll('.list-group-item-load').forEach(item => item.remove());
        document.querySelectorAll('.list-group-item').forEach(item => item.remove());
          console.log('data',response.data.features)
        if (response?.data?.features?.length > 0) {
            response.data.features.forEach(res => {
            const li = document.createElement("li");
            li.innerHTML = res.properties.display_name;
            li.classList.add("list-group-item");
            dropdown.appendChild(li);
          });
        } else {
          const noResultsLi = document.createElement("li");
          noResultsLi.innerHTML = "No results found.";
          noResultsLi.classList.add("list-group-item");
          dropdown.appendChild(noResultsLi);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading = false;
      }
    }, 300);
  }
  
