import { useContext, createContext, useState, useEffect } from "react";
import api from '../api/backend';
import { useNavigate } from "react-router-dom";

const Providetrip = createContext()

export function TripProvider({ children }) {
    const [userDetail, setuserDetail] = useState({})
    const [userLogin, setuserLogin] = useState(false)
    const navigate = useNavigate()
    const [userList, setuserList] = useState([])
    const [admin, setadmin] = useState('')
    const [SearchResult, setSearchResult] = useState({})
    const [searchDetails, setSearchDetails] = useState(null)
    const [filteredPlace, setFilteredPlace] = useState([])
    const [places, setPlaces] = useState([]);

    const signup = async (user) => {
        try {
            console.log(user)
            const response = await api.post('/register', user)
            console.log(response.data.message)
            if (response.data.permisson !== true) {
                alert(response.data.message)
            }
            else {
                alert(response.data.message)
                navigate('/login')

            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`ERROR:${err.message}`)
            }
        }
    }

    const finduser = async () => {
        try {
            const user = localStorage.getItem('userdetail')
            if (user) {
                setuserDetail(user)
                setuserLogin(true)
            }
            else {
                setuserLogin(false)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const saveuser = async (user) => {
        try {
            await localStorage.setItem('userdetail', JSON.stringify(user))
            console.log(user)
            console.log("save user")
            setuserDetail(user)
        } catch (err) {
            console.log(err)
        }
    }
    const savetoken = async (token) => {
        try {
            localStorage.setItem('usertoken', JSON.stringify(token))
            console.log("save token ")
        } catch (err) {
            console.log(err)
        }
    }
    
    const login = async (userData) => {
        try {
            const response = await api.post('/user/login', userData);
            console.log("API Response:", response.data);
    
            if (!response.data.token) {
                console.error("No token received!");
                return null;  // Explicitly return null instead of undefined
            }
    else{
            savetoken(response.data.token);
            saveuser(response.data.user);
    
            console.log("Saved User:", response.data);
    
            if (response.data.role === 'admin') {
                setadmin(true);
                navigate('/adminhome');
            } else {
                setadmin(false);
            }
    
            finduser();}
            return response.data; // ✅ Return response data
        } catch (err) {
            setuserLogin(false);
            console.error("Login Error:", err);
            return null;  // Explicitly return null on error
        }
    };
    


    const logout = () => {
        try {
            localStorage.removeItem("userdetail");
            localStorage.removeItem("usertoken");
            setuserDetail(null);
            setuserLogin(false);
            setadmin(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    const search = async (data) => {
        try {
            if (!data.place || data.place.trim() === '') {
                alert("Enter a valid place name");
                return;
            }

            console.log(data);
            const response = await api.get(`/api/place/city/${data.place}`, data);
            console.log(response.data);

            if (response.data) {
                setSearchResult(response.data);
                setSearchDetails(data);
                navigate('/result');
                return response.data
            }
        } catch (error) {
            console.error("Error fetching places:", error);
            alert("Loading");
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("userDetail");
        if (storedUser) {
            setuserDetail(JSON.parse(storedUser));
        }

        // Simulated API call to fetch places
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const response = await fetch("/api/places/all"); // Replace with your API endpoint
            const data = await response.json();
            setPlaces(data);
            setFilteredPlace(data); // Initially, show all places
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };



    return (
        <Providetrip.Provider value={{ search, signup, login, logout, userDetail, userList, userLogin, admin, SearchResult, searchDetails, setSearchResult, setSearchDetails, setuserDetail, fetchPlaces, setFilteredPlaces: setFilteredPlace, setPlaces, places }}>
            {children}
        </Providetrip.Provider>
    )

}
export const useTrip = () => useContext(Providetrip)

