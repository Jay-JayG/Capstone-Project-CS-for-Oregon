import ResearchAndPolicyCards from "./ResearchAndPolicyCards.jsx";
import './ResearchAndPolicy.css';


function researchAndPolicy() {
    return (
    <div id="main-content">
        <div className={'Background'}>
            <div className='ResearchPageTitle'>RESEARCH & POLICY</div>
            <div className={'TopPageBox'}>
            <p className="PolicyHeader"> Oregon Policy</p>
                <div className={'TopPageText'}> Computer Science is one of the few policy issues that can address both foundational education needs and workforce development demands for a state’s future workforce.</div>
                <br /> 
                <div className={'PolicyContent'}>States and school districts can adopt policies that support access to computer science for all students. The following policy recommendations from code.org provide a framework of policy options states can choose from to support and expand computer science and indicate the current state of CS policy in Oregon.</div>
            </div>
        </div>
        <div>
            <ResearchAndPolicyCards/>
        </div>
        
        
    </div>
    );
  };
  
  export default researchAndPolicy;