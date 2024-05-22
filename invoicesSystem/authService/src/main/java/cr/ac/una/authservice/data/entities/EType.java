package cr.ac.una.authservice.data.entities;

public enum EType {
    PHYSICAL,
    JURIDICAL,
    ADMINISTRATIVE;

    public static EType getEType(String name) {
        for(EType e : EType.values()) {
            if(e.name().equals(name)) return e;
        }
        return null;
    }
}
