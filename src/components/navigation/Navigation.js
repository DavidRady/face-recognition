import React from 'react';
import Logo from '../logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {

        if(isSignedIn){
            return(
                <div className="flex items-center">
                    <div className=" w-50 pa3 mr2 mt2 self-end">
                        <Logo />
                    </div>
                    <div className="w-50 self-start">
                        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <p className='f3 link dim black underline pa3 pointer'  onClick={() => onRouteChange('signout')}> 
                                Sign Out
                            </p>
                        </nav>
                    </div>
                </div>   
            );
        }
        else{
            return(
                <div className="flex items-center">
                    <div className=" w-50 pa3 mr2 mt2 self-end">
                        <Logo />
                    </div>
                    <div className="w-50 self-start">
                        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <p className='f3 link dim black underline pa3 pointer'  onClick={() => onRouteChange('Signin')}> 
                                Sign In
                            </p>
                            <p className='f3 link dim black underline pa3 pointer'  onClick={() => onRouteChange('register')}> 
                                Register
                            </p>
                        </nav>
                    </div>
                </div>   
            );

        }
}

export default Navigation;