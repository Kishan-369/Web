import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace import
content = content.replace(
    "import { FakeNewsScene } from './components/scenes/FakeNewsScene';",
    "import { FakeNewsScene } from './components/scenes/FakeNewsScene';\nimport { Carousel3DScene } from './components/scenes/Carousel3DScene';"
)

# Extract the <main> block
main_match = re.search(r'<main className="w-full relative z-10">(.*?)</main>', content, re.DOTALL)
if main_match:
    main_inner = main_match.group(1)
    
    # We want to replace the first FakeNewsScene with Carousel3DScene and remove the other two FakeNewsScenes
    # Or just insert Carousel3DScene as Scene 3, and bump everything down.
    # The user said "add 3rd new slide", let's just insert it before FakeNewsScene 1, so FakeNewsScene 1 becomes 4.
    
    # Actually, replacing the 3 fake news scenes with the 1 Carousel3DScene is cleaner since it replaces the 3 images.
    # Let's replace the three fake news scenes with Carousel3DScene.
    
    # Fake news scenes are matching:
    # {/* Scene X: Fake News Magazine Story Y */}
    # <div ref={(el) => (sceneRefs.current[X-1] = el)} data-scene-id="X" ...
    
    # First, let's just remove the 3 FakeNewsScene blocks completely.
    main_inner = re.sub(r'\{\/\* Scene \d+: Fake News Magazine Story \d+ \*\/\}\s*<div ref=\{\(el\) => \(sceneRefs\.current\[\d+\] = el\)\} data-scene-id="\d+".*?<\/div>', '', main_inner, flags=re.DOTALL)
    
    # Now insert the Carousel3DScene after QuizTimeScene
    # QuizTimeScene block:
    # {/* Scene 2: Dedicated Assembly Live Quiz Time */}
    # <div ref={(el) => (sceneRefs.current[1] = el)} data-scene-id="2" className="h-screen w-full snap-start snap-always">
    #   <QuizTimeScene />
    # </div>
    
    carousel_block = """
        {/* Scene 3: Fake News 3D Carousel */}
        <div ref={(el) => (sceneRefs.current[2] = el)} data-scene-id="3" className="h-screen w-full snap-start snap-always">
          <Carousel3DScene onNext={() => scrollToScene(4)} />
        </div>"""
        
    main_inner = re.sub(r'(<QuizTimeScene />\s*</div>)', r'\1\n' + carousel_block, main_inner)
    
    # Now we need to renumber all the following scenes starting from index 3 (which is Scene 4)
    # The scenes after QuizTimeScene have scene-id from 6 upwards originally (DarkRoomScene was 6)
    # Let's extract all scene divs and renumber them sequentially!
    
    divs = re.split(r'(\{\/\* Scene \d+:.*?\*\/\}\s*<div ref=\{\(el\) => \(sceneRefs\.current\[\d+\] = el\)\} data-scene-id="\d+"(?:.*?)>)', main_inner)
    
    # divs is a mix. A better way: just find all scene divs and re-index them.
    # Let's use a regex replacement with a counter.
    
    counter = 0
    
    def repl_div(m):
        global counter
        counter += 1
        return f'{m.group(1)}<div ref={{(el) => (sceneRefs.current[{counter-1}] = el)}} data-scene-id="{counter}"{m.group(2)}>'
        
    main_inner = re.sub(r'(\{\/\* Scene \d+:.*?\*\/\}\s*)<div ref=\{\(el\) => \(sceneRefs\.current\[\d+\] = el\)\} data-scene-id="\d+"(.*?)>', repl_div, main_inner)
    
    # Also fix scrollToScene(X)
    # We can just increment the target appropriately, but actually it's easier to just sequentially map them.
    # Wait, some scrollToScene are hardcoded, like scrollToScene(2).
    # Since we removed 2 scenes (from 26 total to 24 total), we should probably fix the numbers.
    # Let's just do it cleanly via a simpler replacement manually or by finding and replacing.
