import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('name');


/**
 Fetches the profile data for a given username.
 @param {string} name - The username to fetch the profile for.
 @returns {Promise<Object>} The profile data.
 */
async function fetchProfile(name) {
    
    try {

        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        console.log("Retrieved Token:", token);

        if (!token) {
            throw new Error("No authentication token found.");
        }

        const requestHeaders = headers(token);
        const response = await fetch(`${API_SOCIAL_PROFILES}/${encodeURIComponent(name)}?_posts=true`, {
            method: 'GET',
            headers: requestHeaders
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const profile = await response.json();
        
        console.log("Profile Data:", profile); 
      
        return profile.data;
    } 
    
    catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}


/**
 Fetches the posts created by a specific user.
 @param {string} name - The username of the user whose posts to fetch.
 @returns {Promise<Array>} An array of posts created by the user.
 */
async function fetchUserPosts(name) {
    
    try {

        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        console.log("Retrieved Token:", token);

        if (!token) {
            throw new Error("No authentication token found.");
        }

        const requestHeaders = headers(token);
        const response = await fetch(`${API_SOCIAL_PROFILES}/${encodeURIComponent(name)}/posts`, {
            method: 'GET',
            headers: requestHeaders
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user posts: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("User Posts Data:", data);

        return Array.isArray(data.data) ? data.data : [];
    } 
    
    catch (error) {
        console.error('Error fetching user posts:', error);
        throw error;
    }
}


/**
 Renders the user's profile and posts on the page.
 @returns {Promise<void>}
 */
async function renderProfile() {
    
    try {
        const profile = await fetchProfile(username);
        const profileDetailContainer = document.querySelector('.profile-detail');
        const userPostsContainer = document.querySelector('.user-posts');

        if (!profileDetailContainer || !userPostsContainer) {
            console.error('Profile or posts container not found.');
            
            return;
        }

        if (!profile) {
            profileDetailContainer.innerHTML = '<p>No profile found.</p>';
            
            return;
        }

        document.title = profile.name ? `${profile.name}'s Profile` : 'User Profile';

        const profileHtml = `

            <div class="profile-content">
                <div class="profile-banner mb-4">
                    ${profile.banner ? `<img src="${profile.banner.url}" alt="${profile.banner.alt}" class="rounded-lg w-full" />` : 'No banner available'}
                </div>
                <div class="profile-name-avatar flex items-center mb-4">
                    <div class="profile-avatar">
                        ${profile.avatar ? `<img src="${profile.avatar.url}" alt="${profile.avatar.alt}" class="w-16 h-16 rounded-full" />` : 'No avatar available'}
                    </div>
                    <h2 class="text-xl font-semibold ml-4">${profile.name || 'No name available'}</h2>
                </div>
                <p class="text-gray-700">${profile.bio || 'No bio available.'}</p>
                <p>Email: <span class="font-semibold">${profile.email || 'No email available.'}</span></p>
                <p>Posts: <span class="font-semibold">${profile._count ? profile._count.posts : 0}</span></p>
                <p>Followers: <span class="font-semibold">${profile._count ? profile._count.followers : 0}</span></p>
                <p>Following: <span class="font-semibold">${profile._count ? profile._count.following : 0}</span></p>
            </div>
        `;

        profileDetailContainer.innerHTML = profileHtml;

        const posts = await fetchUserPosts(username);

        if (posts.length === 0) {
            userPostsContainer.innerHTML = '<p>No posts available.</p>';
            return;
        }

        const postsHtml = posts.map(post => `
            <div class="post mb-4 p-4 border rounded shadow">
                <h3 class="text-lg font-semibold">
                    <a href="/post/single-post/index.html?id=${post.id}" class="text-blue-600 hover:underline">${post.title || 'No title available'}</a>
                </h3>
                <p>${post.body || 'No content available.'}</p>
                <div class="post-media my-2">
                    ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" class="w-full rounded" />` : 'No media available'}
                </div>
                <p>Created: <span class="font-semibold">${post.created ? new Date(post.created).toLocaleDateString() : 'No date available'}</span></p>
                ${post.updated ? `<p>Updated: <span class="font-semibold">${new Date(post.updated).toLocaleDateString()}</span></p>` : ''}
            </div>
        `).join('');

        userPostsContainer.innerHTML = postsHtml;

    } 
    
    catch (error) {
    
        const profileDetailContainer = document.querySelector('.profile-detail');
        profileDetailContainer.innerHTML = '<p>Failed to load profile. Please try again later.</p>';
    }
}


document.addEventListener('DOMContentLoaded', renderProfile);