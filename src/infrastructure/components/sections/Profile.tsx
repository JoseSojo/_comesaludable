import React, { useState } from 'react';
import {
    Settings,
    Grid,
    Bookmark,
    Heart,
    MessageCircle,
    MapPin,
    Calendar,
    Star,
    Camera,
    Edit3,
    Share,
    MoreHorizontal,
    Users,
    Award,
    Utensils,
    User
} from 'lucide-react';
import { useAuth } from '@/domain/context/AuthContext';
import { UserType } from '@/infrastructure/interface/user.type';

interface UserStats {
    posts: number;
    followers: number;
    following: number;
    reviews: number;
    avgRating: number;
}

interface UserPost {
    id: number;
    image: string;
    likes: number;
    comments: number;
    type: 'photo' | 'review';
}

const userStats: UserStats = {
    posts: 127,
    followers: 2847,
    following: 892,
    reviews: 89,
    avgRating: 4.6
};

const userPosts: UserPost[] = [
    {
        id: 1,
        image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
        likes: 234,
        comments: 18,
        type: 'photo'
    },
    {
        id: 2,
        image: "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400",
        likes: 189,
        comments: 12,
        type: 'review'
    },
    {
        id: 3,
        image: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=400",
        likes: 324,
        comments: 25,
        type: 'photo'
    },
    {
        id: 4,
        image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
        likes: 412,
        comments: 31,
        type: 'photo'
    },
    {
        id: 5,
        image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
        likes: 156,
        comments: 9,
        type: 'review'
    },
    {
        id: 6,
        image: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=400",
        likes: 278,
        comments: 16,
        type: 'photo'
    }
];

export default function UserProfile() {
    const auth = useAuth();
    const user = auth.user as UserType;
    const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'reviews'>('posts');
    const [isFollowing, setIsFollowing] = useState(false);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <div className="max-w-lg mx-auto bg-white min-h-screen mt-24">
            {/* Profile Header */}
            <div className="relative">
                {/* Cover Photo */}
                <div className="h-32 bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-700 relative">
                </div>

                {/* Profile Info */}
                <div className="px-4 pb-4">
                    {/* Avatar and Basic Info */}
                    <div className="flex items-end justify-between -mt-12 mb-4">
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">{user.name.substring(0,1).toUpperCase()}{user.lastname.substring(0,1).toUpperCase()}</span>
                            </div>
                            <button className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                                <Camera className="w-3 h-3 text-white" />
                            </button>
                        </div>
                        <div className="flex space-x-2">
                            {/* <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors">
                                <Edit3 className="w-4 h-4 inline mr-1" />
                                Editar
                            </button> */}
                            {/* <button className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <Share className="w-4 h-4" />
                            </button> */}
                            {/* <button className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                            </button> */}
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="mb-4">
                        <h1 className="text-xl font-bold mb-1">{user.name} {user.lastname}</h1>
                        <p className="text-gray-600 text-sm mb-2">{user.email} 🍽️</p>
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{user.age}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-3">
                            {/* <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-semibold">{userStats.avgRating}</span>
                            <span className="text-sm text-gray-500">average rating</span>
                            <Award className="w-4 h-4 text-orange-500 ml-2" />
                            <span className="text-sm text-orange-600 font-medium">Top Reviewer</span> */}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-around py-3 border-t border-gray-100">
                        <div className="text-center">
                            <div className="text-lg font-bold">(cantidad)</div>
                            <div className="text-xs text-gray-500">Comentarios</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold">(cantidad)</div>
                            <div className="text-xs text-gray-500">Favoritos</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                        {/* <button
                            onClick={() => setIsFollowing(!isFollowing)}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${isFollowing
                                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                        >
                            {isFollowing ? 'Following' : 'Follow'}
                        </button> */}
                        {/* <button className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors">
                            <MessageCircle className="w-4 h-4 inline mr-1" />
                            Message
                        </button> */}
                        {/* <button className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors">
                            <Users className="w-4 h-4" />
                        </button> */}
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-t border-gray-200">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`flex-1 py-3 flex items-center justify-center space-x-1 border-b-2 transition-colors ${activeTab === 'posts'
                                ? 'border-gray-900 text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Grid className="w-4 h-4" />
                        <span className="text-sm font-medium">Datos</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`flex-1 py-3 flex items-center justify-center space-x-1 border-b-2 transition-colors ${activeTab === 'reviews'
                                ? 'border-gray-900 text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Utensils className="w-4 h-4" />
                        <span className="text-sm font-medium">Favorios</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`flex-1 py-3 flex items-center justify-center space-x-1 border-b-2 transition-colors ${activeTab === 'saved'
                                ? 'border-gray-900 text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Bookmark className="w-4 h-4" />
                        <span className="text-sm font-medium">Comentarios</span>
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="p-1">
                {activeTab === 'posts' && (
                    <div className="p-4 text-center">
                        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Datos y seguridad</p>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="p-4 text-center">
                        <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Restaurantes/Menus favorios</p>
                    </div>
                )}

                {activeTab === 'saved' && (
                    <div className="p-4 text-center">
                        <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Comentarios</p>
                    </div>
                )}
            </div>
        </div>
    );
}