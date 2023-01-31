import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/challange-60c9b/us-central1/api'
     // THE API {CLOUD FUNCTIONS} URL
});

export default instance