import React from 'react';
import { Clock, Target, TrendingUp } from 'lucide-react';

const Workouts: React.FC = () => {
  const workoutPlan = {
    title: "Week 1-3 Training Plan",
    description: "Build your foundation with this progressive training program",
    duration: "3 weeks",
    difficulty: "Beginner to Intermediate",
    sessions: [
      {
        id: 1,
        title: "Active Warmup",
        exercises: [
          "10x Knee Hugs",
          "10x Leg Swings", 
          "10x High Knees",
          "10x Butt Kicks"
        ],
        duration: "5-10 minutes"
      },
      {
        id: 2,
        title: "400m Warmup Walk",
        description: "Easy pace walking to get your body ready",
        duration: "3-5 minutes"
      },
      {
        id: 3,
        title: "400m Warmup Jog",
        description: "Light jogging to increase heart rate",
        duration: "2-3 minutes"
      },
      {
        id: 4,
        title: "400m Intervals",
        description: "8 repetitions of 400m at moderate pace",
        sets: "8x 400m",
        rest: "2-3 minutes between intervals",
        duration: "25-30 minutes"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Workout Tracking
          </h1>
          <p className="text-lg text-gray-600">
            Log your runs and track your progress
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {workoutPlan.title}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {workoutPlan.description}
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{workoutPlan.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>{workoutPlan.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {workoutPlan.sessions.map((session) => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {session.title}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {session.duration}
                  </span>
                </div>
                
                {session.exercises && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Exercises:</h4>
                    <ul className="space-y-1">
                      {session.exercises.map((exercise, index) => (
                        <li key={index} className="text-gray-600 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>{exercise}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {session.description && (
                  <p className="text-gray-600 mb-2">{session.description}</p>
                )}
                
                {session.sets && (
                  <div className="text-gray-600">
                    <span className="font-medium">Sets: </span>
                    {session.sets}
                  </div>
                )}
                
                {session.rest && (
                  <div className="text-gray-600">
                    <span className="font-medium">Rest: </span>
                    {session.rest}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
              Start Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
