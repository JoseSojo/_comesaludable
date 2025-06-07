"use client"

import { useAuth } from '@/domain/context/AuthContext';
import FullScreenLoader from '@/infrastructure/components/common/Loadding';
import CommentsList from '@/infrastructure/components/profile/CommentsList';
import FavoritesList from '@/infrastructure/components/profile/FavoritesList';
import PasswordForm from '@/infrastructure/components/profile/PasswordForm';
import ProfileForm from '@/infrastructure/components/profile/ProfileForm';
import ProfileTabs from '@/infrastructure/components/profile/ProfileTabs';
import UserAvatar from '@/infrastructure/components/profile/UserAvatar';
import UserProfile from '@/infrastructure/components/sections/Profile';
import Header from '@/infrastructure/layout/Header';
import React, { useEffect, useState } from 'react';

const UserProfileMain = ({ }) => {

    const { user, loadding } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [currentUser, setCurrentUser] = useState(user);


    useEffect(() => {
        setCurrentUser(user);
    }, [loadding])

    return loadding ? <FullScreenLoader /> : currentUser && (
        <>
            <Header />

            <UserProfile />

            {/* <div className="max-w-4xl mx-auto p-4 md:p-6 mt-5">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                    {/* <UserAvatar src={currentUser.avatar} alt={currentUser.name} /> 
                    <div>
                        {/* <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1> 
                        {/* <p className="text-gray-600">{currentUser.email}</p> 
                    </div>
                </div>

                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="mt-6">
                    {activeTab === 'profile' && (
                        <ProfileForm user={currentUser} />
                    )}

                    {activeTab === 'password' && (
                        <PasswordForm />
                    )}

                    {/* {activeTab === 'comments' && (
                    <CommentsList comments={currentUser.comments} />
                )} 

                    {/* {activeTab === 'favorites' && (
                    <FavoritesList favorites={currentUser.favorites} />
                )} 
                </div>
            </div> */}
        </>
    );
};

export default UserProfileMain;