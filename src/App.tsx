/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Hero from './components/Hero';
import WhoIsJeezeev from './components/WhoIsJeezeev';
import Triggers from './components/Triggers';
import InternalConflict from './components/InternalConflict';
import Scenarios from './components/Scenarios';
import Types from './components/Types';
import Test from './components/Test';
import Manifesto from './components/Manifesto';

export default function App() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-[var(--color-acid-red)] selection:text-white">
      <CustomCursor />
      <NoiseOverlay />
      
      <Hero />
      <WhoIsJeezeev />
      <Triggers />
      <InternalConflict />
      <Scenarios />
      <Types />
      <Test />
      <Manifesto />
    </main>
  );
}
