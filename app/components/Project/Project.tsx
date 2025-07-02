import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import './Project.scss';

interface Project {
  id: number;
  nameKey: string;
  image: string;
  alt: string;
  descriptionKey?: string;
  categoryKey: string;
}

interface ProjectsProps {
  onProjectClick?: (projectId: number) => void;
  activeProjectId?: number;
  companyId?: number;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectClick, activeProjectId, companyId }) => {
  const { t } = useLanguage();

  const projects: Project[] = [
    {
      id: 1,
      nameKey: "projects.residential_complex",
      image: "/images/project1.webp",
      alt: "Residential Complex Project",
      descriptionKey: "projects.residential_complex_desc",
      categoryKey: "categories.construction"
    },
    {
      id: 2,
      nameKey: "projects.commercial_center",
      image: "/images/project2.webp",
      alt: "Commercial Center Project",
      descriptionKey: "projects.commercial_center_desc",
      categoryKey: "categories.real_estate"
    },
    {
      id: 3,
      nameKey: "projects.investment_portfolio",
      image: "/images/project3.webp",
      alt: "Investment Portfolio Project",
      descriptionKey: "projects.investment_portfolio_desc",
      categoryKey: "categories.investment"
    },
    {
      id: 4,
      nameKey: "projects.oil_refinery",
      image: "/images/project4.webp",
      alt: "Oil Refinery Project",
      descriptionKey: "projects.oil_refinery_desc",
      categoryKey: "categories.petrochemical"
    },
    {
      id: 5,
      nameKey: "projects.manufacturing_plant",
      image: "/images/project5.webp",
      alt: "Manufacturing Plant Project",
      descriptionKey: "projects.manufacturing_plant_desc",
      categoryKey: "categories.industrial"
    },
    {
      id: 6,
      nameKey: "projects.solar_farm",
      image: "/images/project6.webp",
      alt: "Solar Farm Project",
      descriptionKey: "projects.solar_farm_desc",
      categoryKey: "categories.energy"
    },
    {
      id: 7,
      nameKey: "projects.logistics_center",
      image: "/images/project7.webp",
      alt: "Logistics Center Project",
      descriptionKey: "projects.logistics_center_desc",
      categoryKey: "categories.trading"
    },
    {
      id: 8,
      nameKey: "projects.resort_development",
      image: "/images/project8.webp",
      alt: "Resort Development Project",
      descriptionKey: "projects.resort_development_desc",
      categoryKey: "categories.tourism"
    }
  ];

  const handleProjectClick = (projectId: number) => {
    if (onProjectClick) {
      onProjectClick(projectId);
    }
  };

  const filteredProjects = companyId 
    ? projects.filter(project => {
        return true;
      })
    : projects;

  return (
    <div className="projects">
      <div className="projects__grid">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className={`projects__item ${activeProjectId === project.id ? 'projects__item--active' : ''}`}
            onClick={() => handleProjectClick(project.id)}
          >
            {/* Background Image */}
            <div className="projects__background">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                className="projects__background-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="projects__overlay"></div>
            </div>

            {/* Content Overlay */}
            <div className="projects__content">
              <div className="projects__category">{t(project.categoryKey)}</div>
              <h3 className="projects__name">{t(project.nameKey)}</h3>
              {project.descriptionKey && (
                <p className="projects__description">{t(project.descriptionKey)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;