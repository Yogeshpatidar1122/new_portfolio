// @flow strict

import * as React from 'react';
import { BsGithub } from 'react-icons/bs';
import { SiVercel } from 'react-icons/si';
import Link from 'next/link';
import { personalData } from '@/utils/data/personal-data';

function ProjectCard({ project }) {
  return (
    <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full">
      {/* Gradient Line */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
        {/* Single-line Layout */}
        <div className="flex items-center justify-between">
          {/* Signal Bullets */}
          <div className="flex space-x-1 lg:space-x-2">
            <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
            <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
            <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200"></div>
          </div>

          {/* Project Name */}
          <p className="text-center text-[#16f2b3] text-base lg:text-xl">
            {project.name}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link href={personalData.github} target="_blank" aria-label="GitHub" className="transition-transform text-pink-500 hover:scale-125">
              <BsGithub size={26} />
            </Link>
            <Link href={personalData.Vercel} target="_blank" aria-label="Vercel Deployment" className="transition-transform text-pink-500 hover:scale-125">
              <SiVercel size={26} />
            </Link>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base">
          <div className="blink">
            <span className="mr-2 text-pink-500">const</span>
            <span className="mr-2 text-white">project</span>
            <span className="mr-2 text-pink-500">=</span>
            <span className="text-gray-400">{& apos;{& apos;}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
            <span className="text-gray-400">&apos;</span>
            <span className="text-amber-300">{project.name}</span>
            <span className="text-gray-400">&apos;,</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">tools:</span>
            <span className="text-gray-400">[</span>
            {project.tools.map((tag, i) => (
              <React.Fragment key={i}>
                <span className="text-amber-300">{tag}</span>
                {i < project.tools.length - 1 && <span className="text-gray-400">, </span>}
              </React.Fragment>
            ))}
            <span className="text-gray-400">],</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">role:</span>
            <span className="text-orange-400">'{project.role}'</span>,
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">description:</span>
            <span className="text-cyan-400">'{project.description}'</span>,
          </div>
          <div className="text-gray-400">{& apos;};&apos;}</div>
        </code>
      </div>
    </div>
  );
}

export default ProjectCard;
