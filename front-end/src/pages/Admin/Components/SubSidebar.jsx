import React from 'react';

const SubSidebar = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-[200px] bg-white shadow-lg rounded-xl p-4 border-2">
            <div className="space-y-2 flex flex-col items-start justify-center">
                <button
                    onClick={() => setActiveTab('create')}
                    className={`w-full text-left px-4 py-2 rounded-lg  font-nunito font-semibold transform transition-all duration-300 hover:shadow-xl hover:border-2  ${
                        activeTab === 'create'
                            ?  "bg-navy-blue-500 text-white"
                            :  "hover:shadow-slate-400"
                    }`}
                >
                    Create
                </button>
                <button
                    onClick={() => setActiveTab('viewAll')}
                    className={`w-full text-left px-4 py-2 rounded-lg font-nunito font-semibold transform transition-all duration-300 hover:shadow-xl hover:border-2  ${
                        activeTab === 'viewAll'
                            ?  "bg-navy-blue-500 text-white"
                            :  "hover:shadow-slate-400"
                    }`}
                >
                    View All
                </button>
            </div>
        </div>
    );
};

export default SubSidebar; 