import { SmokeVelocity } from "./smoke";

@Component('smokeSource')
export class SmokeSource {
  smokeInterval: number = 5
  nextSmoke: number = this.smokeInterval
  constructor(interval: number = 5
  ) {
    this.smokeInterval = interval
  }
}

// component group grid positions
const smokeHoles = engine.getComponentGroup(SmokeSource)

export class ThrowSmoke implements ISystem {
  update(dt: number) { 
    for (let hole of smokeHoles.entities) {
      let data = hole.getComponent(SmokeSource)
      data.nextSmoke -= dt
      if (data.nextSmoke < 0) {
        data.nextSmoke = data.smokeInterval
        smokeSpawner.SpawnSmokePuff(hole)
      }
    }
  }
}



// Reusable material for smoke puffs
let smokeTexture = new Texture('textures/cloud.png')


const smokeMaterial = new Material()
smokeMaterial.albedoTexture = smokeTexture

smokeMaterial.alphaTest = 0.2
smokeMaterial.alphaTexture = smokeTexture

// Reusable shape component for smoke puffs
const smokeShape = new PlaneShape()
smokeShape; new Transform({
  position: new Vector3 (8, 50, 8),
  scale: new Vector3 (200, 100, 200),
  rotation: new Quaternion(1, 0, 0, 1),

})





// Spawner object to generate smoke puffs
export const smokeSpawner = {
  MAX_POOL_SIZE: 14,
  pool: [] as Entity[],

  getEntityFromPool(): IEntity | null {
    for (let i = 0; i < smokeSpawner.pool.length; i++) {
      if (!smokeSpawner.pool[i].alive) {
        return smokeSpawner.pool[i]
      }
    }

    if (smokeSpawner.pool.length < smokeSpawner.MAX_POOL_SIZE) {
      const instance = new Entity()
      smokeSpawner.pool.push(instance)
      return instance
    }

    return null
  },

  SpawnSmokePuff(parent: IEntity) {
    const ent = smokeSpawner.getEntityFromPool()

    if (!ent) return

    const newVel = {
      x: (Math.random() - Math.random()) / 2,
      y: Math.random() / 7,
      z: (Math.random() - Math.random()) / 100
    }

    const size = Math.random() / 2 + 0.2

    ent.addComponentOrReplace(smokeShape)
    ent.addComponentOrReplace(smokeMaterial)

    ent.setParent(parent)

    if (!ent. getComponentOrNull(Transform)) {
      const t = new Transform()
      ent.addComponentOrReplace(t)
      t.scale.set(size, size, size)
      t.position.set(0, 0, 0)
    } else {
      const t = ent.getComponent(Transform)
      t.scale.set(size, size, size)
      t.position.set(0, 0, 0)
    }

    if (!ent. getComponentOrNull(SmokeVelocity)) {
      ent.addComponentOrReplace(new SmokeVelocity(newVel.x, newVel.y, newVel.z))
    } else {
      const vel = ent.getComponent(SmokeVelocity)
      vel.set(newVel.x, newVel.y, newVel.z)
    }

    

    engine.addEntity(ent)
  }
}



// let testPuff = new Entity()

// testPuff.addComponent(new PlaneShape())
// testPuff.addComponent(smokeMaterial)

// const t = new Transform()
// testPuff.addComponentOrReplace(t)
//   t.scale.set(2, 2, 2)
//   t.position.set(3, 1, 3)

// testPuff.addComponent(billboard)

// engine.addEntity(testPuff)