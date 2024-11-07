
public class MenuBean implements java.io.Serializable {
	
	private int id, price;
	private String name;
	
	public MenuBean(int id, String name, int price) {
		this.id = id;
		this.name = name;
		this.price = price;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return id;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public void setPrice(int price) {
		this.price = price;
	}
	
	public int getPrice() {
		return price;
	}
}
