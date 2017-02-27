export default function api(url, request){
    return fetch(url, {
        credentials: 'include',
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    }).then((resp)=>{
        return resp.json();
    });
}
