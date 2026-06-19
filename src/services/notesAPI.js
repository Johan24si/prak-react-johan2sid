import axios from 'axios'

const API_URL = "https://clukobisrvdmcdxbosfu.supabase.co/rest/v1/note"
const API_KEY = "sb_publishable_9hPjB45t8bQekfqP7Z8rWQ_EsWFumx5"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    async deleteNote(id) {
        // PERBAIKAN: Pembungkusan dengan backticks untuk string URL dinamis
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        return response.data
    }
}